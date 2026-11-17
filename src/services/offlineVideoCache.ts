import { VideoStory } from '../types';
import { getMediaBlob, hasMediaBlob, saveMediaBlob } from './mediaStorage';

const OFFLINE_VIDEO_PREFIX = 'offline-story-mp4-';
const VIDEO_CACHE_NAME = 'yachay-videos-offline-v1';

const inFlightCaching = new Map<string, Promise<boolean>>();

export function getOfflineVideoKey(storyId: string): string {
  return `${OFFLINE_VIDEO_PREFIX}${storyId}`;
}

export async function isVideoCachedOffline(storyId: string): Promise<boolean> {
  return hasMediaBlob(getOfflineVideoKey(storyId));
}

export async function getCachedOfflineVideoIds(stories: VideoStory[]): Promise<Set<string>> {
  const cached = new Set<string>();
  const videoStories = stories.filter((s) => Boolean(s.videoUrl));
  await Promise.all(
    videoStories.map(async (story) => {
      if (await isVideoCachedOffline(story.id)) {
        cached.add(story.id);
      }
    })
  );
  return cached;
}

export async function ensureVideoCachedOffline(
  storyId: string,
  videoUrl: string
): Promise<boolean> {
  const key = getOfflineVideoKey(storyId);
  if (await hasMediaBlob(key)) {
    return true;
  }

  const existing = inFlightCaching.get(storyId);
  if (existing) {
    return existing;
  }

  const task = (async () => {
    try {
      // Try Cache Storage first if already precached by Workbox
      if (typeof caches !== 'undefined') {
        const cachedMatch = await caches.match(videoUrl, { ignoreSearch: true });
        if (cachedMatch && cachedMatch.ok) {
          const blob = await cachedMatch.blob();
          if (blob.size > 0) {
            await saveMediaBlob(key, blob);
            return true;
          }
        }
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return false;
      }

      // Fetch full 200 OK file (no Range header) so IndexedDB & Cache API hold the entire MP4
      const resp = await fetch(videoUrl, { cache: 'default' });
      if (!resp.ok) return false;

      const blob = await resp.blob();
      if (blob.size === 0) return false;

      await saveMediaBlob(key, blob);

      // Also mirror into Cache Storage for service worker range requests
      if (typeof caches !== 'undefined') {
        try {
          const cache = await caches.open(VIDEO_CACHE_NAME);
          await cache.put(
            videoUrl,
            new Response(blob, {
              status: 200,
              headers: {
                'Content-Type': blob.type || 'video/mp4',
                'Content-Length': String(blob.size),
              },
            })
          );
        } catch {
          // Ignore Cache API quota errors; IndexedDB already stored the blob
        }
      }

      return true;
    } catch {
      return false;
    } finally {
      inFlightCaching.delete(storyId);
    }
  })();

  inFlightCaching.set(storyId, task);
  return task;
}

export async function getOfflinePlayableVideoUrl(
  storyId: string,
  videoUrl: string
): Promise<{ url: string; isObjectUrl: boolean }> {
  const key = getOfflineVideoKey(storyId);

  // 1. Primary: IndexedDB local blob URL (works 100% offline without HTTP Range issues)
  const localBlob = await getMediaBlob(key);
  if (localBlob && localBlob.size > 0) {
    return { url: URL.createObjectURL(localBlob), isObjectUrl: true };
  }

  // 2. Secondary: Service Worker / Cache Storage fallback
  if (typeof caches !== 'undefined') {
    try {
      const cachedMatch = await caches.match(videoUrl, { ignoreSearch: true });
      if (cachedMatch && cachedMatch.ok) {
        const blob = await cachedMatch.blob();
        if (blob.size > 0) {
          await saveMediaBlob(key, blob);
          return { url: URL.createObjectURL(blob), isObjectUrl: true };
        }
      }
    } catch {
      // Ignore cache lookup error
    }
  }

  // 3. Fallback to network URL and silently cache in background for future offline playback
  void ensureVideoCachedOffline(storyId, videoUrl);
  return { url: videoUrl, isObjectUrl: false };
}

export async function precacheAllStoryVideos(
  stories: VideoStory[],
  onProgress?: (cachedIds: Set<string>, currentStoryId?: string) => void
): Promise<Set<string>> {
  const videoStories = stories.filter((s) => Boolean(s.videoUrl));
  const cachedIds = await getCachedOfflineVideoIds(videoStories);
  onProgress?.(new Set(cachedIds));

  for (const story of videoStories) {
    if (!story.videoUrl) continue;
    if (cachedIds.has(story.id)) continue;
    if (typeof navigator !== 'undefined' && !navigator.onLine) break;

    onProgress?.(new Set(cachedIds), story.id);
    const ok = await ensureVideoCachedOffline(story.id, story.videoUrl);
    if (ok) {
      cachedIds.add(story.id);
      onProgress?.(new Set(cachedIds));
    }
  }

  return cachedIds;
}
