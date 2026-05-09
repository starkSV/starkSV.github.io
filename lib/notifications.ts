import type { Notification } from '@/types'

export const NOTIFICATIONS: Notification[] = [
  { id: '1', city: 'San Francisco', action: 'is viewing',       target: 'Pixlyzer',              emoji: '👀' },
  { id: '2', city: 'London',        action: 'just checked out', target: 'your GitHub',            emoji: '⭐' },
  { id: '3', city: 'Berlin',        action: 'is reading',       target: 'your latest blog',       emoji: '📖' },
  { id: '4', city: 'Toronto',       action: 'viewed',           target: 'Bottleneck Calculator',  emoji: '🔍' },
  { id: '5', city: 'Singapore',     action: 'downloaded',       target: 'your resume',            emoji: '⬇️' },
  { id: '6', city: 'Sydney',        action: 'is viewing',       target: 'your portfolio',         emoji: '🌏' },
  { id: '7', city: 'New York',      action: 'just visited',     target: 'MSDL',                  emoji: '🗽' },
  { id: '8', city: 'Tokyo',         action: 'explored',         target: 'your projects',          emoji: '🚀' },
]
