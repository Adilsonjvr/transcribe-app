# Database Setup - Transcribe App

## Overview

This directory contains all SQL scripts necessary to set up the Supabase database for the Transcribe App.

## Quick Setup

Execute the SQL files in this order:

### 1. User Profiles Table
```bash
File: user_profiles_fixed.sql
```
Creates the `user_profiles` table with:
- Personal information (full_name, company, job_title, phone)
- Avatar URL
- Subscription tiers (free, pro, enterprise)
- User preferences (language, notifications, export format)
- Onboarding tracking

### 2. Transcriptions Table
```bash
File: FIX_TRANSCRIPTIONS.sql
```
Creates the `transcriptions` table with:
- Transcription data (file_name, transcription text)
- Metadata (word_count, char_count, language)
- Features flags (has_diarization, has_timestamps)
- Audio information (duration, file_size, file_type)
- JSONB metadata for speakers and timestamps

### 3. Storage Policies
```bash
File: storage_policies.sql
```
Sets up Supabase Storage policies for:
- Avatar uploads (user-specific access)
- Public read access for avatars
- User-only write access

## Database Schema

### Tables

#### `public.user_profiles`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to auth.users |
| `full_name` | TEXT | User's full name |
| `company` | TEXT | Company name |
| `job_title` | TEXT | Job title |
| `phone` | TEXT | Phone number |
| `avatar_url` | TEXT | Avatar image URL |
| `subscription_tier` | TEXT | free/pro/enterprise |
| `monthly_minutes_used` | INTEGER | Minutes transcribed this month |
| `monthly_minutes_limit` | INTEGER | Plan limit (default: 60) |
| `preferences` | JSONB | User preferences |
| `onboarding_completed` | BOOLEAN | Onboarding status |
| `onboarding_step` | INTEGER | Current onboarding step |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### `public.transcriptions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to auth.users |
| `file_name` | TEXT | Original audio file name |
| `file_size` | BIGINT | File size in bytes |
| `file_type` | TEXT | MIME type |
| `transcription` | TEXT | Full transcription text |
| `language` | TEXT | Language code (pt-BR, en, etc) |
| `has_diarization` | BOOLEAN | Speaker identification enabled |
| `has_timestamps` | BOOLEAN | Timestamps included |
| `word_count` | INTEGER | Number of words |
| `char_count` | INTEGER | Number of characters |
| `duration_seconds` | INTEGER | Audio duration |
| `audio_url` | TEXT | Audio file URL (if stored) |
| `metadata` | JSONB | Speakers, timestamps, segments |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## Row Level Security (RLS)

Both tables have RLS enabled with policies:

- **SELECT**: Users can only view their own data
- **INSERT**: Users can only create their own data
- **UPDATE**: Users can only update their own data
- **DELETE**: Users can only delete their own data

Security rule: `auth.uid() = user_id`

## Triggers and Functions

### Auto-update `updated_at`
Both tables have triggers that automatically update the `updated_at` column on any UPDATE.

### Auto-create profile on user signup
When a new user registers via Supabase Auth, a profile is automatically created in `user_profiles`.

## Migration from localStorage

The app automatically migrates old transcriptions from localStorage to Supabase:

1. On first load, checks Supabase for existing transcriptions
2. If none found, checks localStorage
3. Migrates localStorage data to Supabase in background
4. Clears localStorage after successful migration

Implementation: `src/hooks/useHistory.js`

## Supabase Dashboard Access

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Copy and paste the SQL from each file
5. Click **RUN**

## Troubleshooting

### "Table already exists" error
If you get this error, the table was already created. You can:
- Skip that file, or
- Use `DROP TABLE IF EXISTS` to recreate it

### "Policy already exists" error
This is safe to ignore. Policies were already created in a previous run.

### "Column does not exist" error
Make sure you're using the **latest** SQL files:
- `FIX_TRANSCRIPTIONS.sql` (not EXECUTE_THIS.sql or transcriptions.sql)
- `user_profiles_fixed.sql` (not user_profiles.sql)

## Archive

Old/duplicate SQL files have been moved to `./archive/` for reference but are no longer needed:
- ~~EXECUTE_THIS.sql~~ → Use FIX_TRANSCRIPTIONS.sql instead
- ~~add_transcriptions_table.sql~~ → Duplicate
- ~~transcriptions.sql~~ → Older version
- ~~complete_schema.sql~~ → Combined file (no longer needed)
- ~~user_profiles.sql~~ → Use user_profiles_fixed.sql instead

## Related Documentation

- [Transcriptions Setup Guide](./TRANSCRIPTIONS_SETUP.md) - Detailed guide with benefits
- [Main Setup Guide](./SETUP_GUIDE.md) - General database setup
- [Storage Policies](./storage_policies.sql) - Avatar upload configuration

## Need Help?

Check the main documentation:
- [Documentation Index](../ INDEX.md)
- [Developer Guide](../development/DEVELOPER_GUIDE.md)
- [Project Structure](../technical/PROJECT_STRUCTURE.md)
