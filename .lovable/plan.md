
# Implementation Plan: Galleries, Tantra Expansion, Admin Dashboard & Audiobook Player

## Overview

This plan covers four major feature additions to the ṚTA platform:
1. **Image Upload for Galleries** - Storage integration with upload functionality
2. **Expanded Tantra Categories** - Shakta Upasana, Nath Sampradaya, and Kashmir Shaivism
3. **Admin Dashboard** - Content management interface for blog, articles, audiobooks, and galleries
4. **Audiobook Player** - Full-featured player with chapters, progress tracking, and playback controls

Additionally, I'll fix the React.forwardRef warnings shown in console logs for Footer and RtaLogo components.

---

## Phase 1: Database & Storage Setup

### 1.1 Create Storage Bucket for Gallery Images

Create a new storage bucket called `gallery-images` with public access:

```text
Storage Configuration:
- Bucket: gallery-images (public)
- RLS: Allow admins to upload/delete, everyone can read
```

### 1.2 Add Audiobook Progress Tracking Table

New table `audiobook_progress` to track user listening progress:

```text
Table: audiobook_progress
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- audiobook_id: uuid (references audiobooks)
- current_chapter: integer
- current_position_seconds: integer
- is_completed: boolean
- last_played_at: timestamp
- created_at: timestamp
```

---

## Phase 2: Expanded Tantra Content

### 2.1 Add Three New Tantra Categories

Extend `src/data/tantraScriptures.ts` with:

**Shakta Upasana (शाक्त उपासना)**
Articles covering:
- Śrī Vidyā tradition and Sri Chakra worship
- Lalitā Sahasranāma practice
- Navāvarana Pūjā
- Shakti Pīṭhas pilgrimage
- Kumārī Pūjā and the worship of the Divine Child

**Nath Sampradaya (नाथ सम्प्रदाय)**
Articles covering:
- Gorakhnāth and the Nine Naths
- Haṭha Yoga and its tantric origins
- Kāya Sādhana (body alchemy)
- Nāda Yoga and inner sound
- Siddha lineage and immortality traditions

**Kashmir Shaivism (काश्मीर शैव दर्शन)**
Articles covering:
- Pratyabhijñā (Recognition philosophy)
- Spanda doctrine (Divine Pulsation)
- Trika system of Śiva-Śakti-Nara
- Vijñāna Bhairava Tantra and 112 methods
- Abhinavagupta's contributions

Each article follows the existing `TantraArticle` interface with gallery support, mantras, cross-references, and citations.

---

## Phase 3: Image Upload & Gallery Management

### 3.1 Gallery Image Uploader Component

Create `src/components/admin/GalleryUploader.tsx`:
- Drag-and-drop file upload interface
- Image preview before upload
- Caption and alt text input fields
- Upload progress indicator
- Integration with Supabase Storage

### 3.2 Enhanced Image Gallery Component

Update `src/components/gallery/ImageGallery.tsx`:
- Display actual uploaded images (not just placeholders)
- Support for public URLs from storage bucket
- Responsive grid with masonry-like layout
- Loading states and error handling

### 3.3 Admin Gallery Manager

Create `src/components/admin/GalleryManager.tsx`:
- List all galleries by content type
- Add/remove images from galleries
- Reorder images with drag-and-drop
- Link galleries to content (tantra articles, blog posts, etc.)

---

## Phase 4: Admin Dashboard

### 4.1 Admin Layout & Navigation

Create `src/pages/Admin.tsx` with sidebar navigation:

```text
Admin Dashboard Structure:
├── Overview (stats cards)
├── Blog Posts
│   ├── All Posts
│   ├── Create New
│   └── Edit Post
├── Audiobooks
│   ├── Library
│   ├── Upload New
│   └── Manage Chapters
├── Galleries
│   ├── All Galleries
│   └── Upload Images
├── Content
│   ├── Philosophy Articles
│   └── Tantra Content
└── Users (view only)
```

### 4.2 Admin Components

**Dashboard Overview** (`src/components/admin/AdminOverview.tsx`):
- Stats cards: Total posts, audiobooks, galleries, users
- Recent activity feed
- Quick action buttons

**Blog Post Editor** (`src/components/admin/BlogEditor.tsx`):
- Rich text editing with markdown support
- Featured image upload
- Category and tag management
- Publish/Draft/Archive status controls
- Preview functionality

**Content List** (`src/components/admin/ContentList.tsx`):
- Sortable, filterable table of content items
- Status indicators (draft, published, archived)
- Quick actions (edit, delete, publish)

**Audiobook Manager** (`src/components/admin/AudiobookManager.tsx`):
- Upload audiobook cover image
- Define chapters with timestamps (JSONB structure)
- Audio file URL management
- Publish controls

### 4.3 Protected Admin Route

Update routing to include admin-only access:
- Add `/admin` route protected by `useAdmin` hook
- Show admin link in Header for authorized users
- Redirect unauthorized users to home

---

## Phase 5: Audiobook Player

### 5.1 Core Player Components

**AudiobookPlayer** (`src/components/audiobook/AudiobookPlayer.tsx`):
- Full-screen player interface
- Album art display
- Title and narrator information
- Current chapter indicator

**PlaybackControls** (`src/components/audiobook/PlaybackControls.tsx`):
- Play/Pause button
- Skip forward/backward (15 seconds)
- Previous/Next chapter navigation
- Playback speed selector (0.5x to 2x)
- Volume slider

**ProgressBar** (`src/components/audiobook/ProgressBar.tsx`):
- Visual timeline with chapter markers
- Seek functionality (click/drag)
- Current time / total duration display
- Buffering indicator

**ChapterList** (`src/components/audiobook/ChapterList.tsx`):
- Expandable chapter navigation
- Current chapter highlight
- Chapter duration display
- Jump to chapter functionality

### 5.2 Audiobook Library Page

Create `src/pages/Audiobooks.tsx`:
- Grid of available audiobooks
- Category filtering
- Search functionality
- Continue listening section (for logged-in users)

### 5.3 Progress Tracking Hook

Create `src/hooks/useAudiobookProgress.ts`:
- Fetch user's progress for an audiobook
- Update progress on pause or chapter change
- Mark as completed when finished
- Resume from last position

### 5.4 Mini Player Component

Create `src/components/audiobook/MiniPlayer.tsx`:
- Persistent bottom bar during playback
- Shows on all pages when audio is playing
- Expandable to full player
- Basic play/pause controls

---

## Phase 6: Bug Fixes

### 6.1 Fix React.forwardRef Warnings

**Footer.tsx** and **RtaLogo.tsx** are function components receiving refs:
- Wrap `RtaLogo` with `React.forwardRef` to properly handle refs
- Ensure Footer doesn't pass refs to functional children

---

## File Structure Summary

### New Files to Create

```text
src/pages/
├── Admin.tsx
├── Audiobooks.tsx

src/components/admin/
├── AdminLayout.tsx
├── AdminOverview.tsx
├── AdminSidebar.tsx
├── BlogEditor.tsx
├── ContentList.tsx
├── AudiobookManager.tsx
├── GalleryUploader.tsx
├── GalleryManager.tsx

src/components/audiobook/
├── AudiobookPlayer.tsx
├── PlaybackControls.tsx
├── ProgressBar.tsx
├── ChapterList.tsx
├── MiniPlayer.tsx
├── AudiobookCard.tsx

src/hooks/
├── useAudiobookProgress.ts
├── useAudiobooks.ts
├── useGalleries.ts
```

### Files to Modify

```text
src/data/tantraScriptures.ts - Add 3 new categories
src/components/RtaLogo.tsx - Add forwardRef
src/components/gallery/ImageGallery.tsx - Support real images
src/components/Header.tsx - Add admin link for authorized users
src/App.tsx - Add new routes
```

### Database Migration

```text
1. Create storage bucket: gallery-images
2. Create table: audiobook_progress
3. Add storage RLS policies
4. Add audiobook_progress RLS policies
```

---

## Technical Considerations

### Storage Bucket Configuration
- **gallery-images**: Public bucket for gallery content
- RLS policies allow admins to upload, everyone can view
- File naming convention: `{content_type}/{content_id}/{uuid}.{ext}`

### Audiobook Chapter Schema
The existing `chapters` JSONB column will store:
```text
{
  chapters: [
    { number: 1, title: "Introduction", startTime: 0, duration: 300 },
    { number: 2, title: "Chapter One", startTime: 300, duration: 600 },
    ...
  ]
}
```

### Audio Playback
- Use HTML5 Audio API for playback
- Store audio files externally (URL reference in database)
- Support common formats: MP3, M4A, OGG

### Progress Sync Strategy
- Save progress every 30 seconds during playback
- Save immediately on pause/chapter change
- Debounce database writes to prevent excessive updates

---

## Implementation Order

1. Database migration (storage bucket + audiobook_progress table)
2. Fix React.forwardRef warnings
3. Expand tantra content with 3 new categories
4. Build gallery image uploader and storage integration
5. Create admin dashboard layout and navigation
6. Implement blog editor for admin
7. Build audiobook library page
8. Create full audiobook player with controls
9. Implement progress tracking
10. Add mini player for persistent playback
11. Final integration testing
