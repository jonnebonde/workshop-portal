# News Page UX/UI spec

## Purpose

`/news` is a simple news page for workshop users. The page should make it easy to:

- see which news messages exist
- understand which messages are new or unread
- open a message in a modal without leaving the page
- confirm that an important message has been read
- download any attachments

This is currently a mockup used to show intended UX/UI to developers. It uses local mock data and local component state.

## Page layout

The page consists of:

- a top section with the title `News`
- a card list with all news messages
- an empty state if the list is empty
- a modal that opens when the user clicks `View`

Each news card currently shows:

- title
- status badge
- published date
- button to open the message in a modal

## Card list

The card list should give a quick overview without requiring navigation to a separate detail page.

Expected UX:

- unread messages should be clearly marked
- the user opens a message via `View`
- the list remains visible in the background while the modal is open

Current mockup logic:

- an unread message shows the badge `New message`
- read state is controlled by `confirmedRead[newsItem.id]`
- when a non-important message is closed from the modal, it is marked as read and the badge is removed from the list
- important messages keep the `New message` badge until the user explicitly clicks `Confirm read`

Note:

- the current code renders a read badge container without visible text on the card. That should be replaced with a clear label such as `Read` or `Confirmed`.

## News modal

When the user clicks `View`, a centered modal opens above the page.

The modal contains:

- close button in the top-right corner
- title
- published date
- full content
- optional image
- attachments with a `Download` button
- one footer action button whose label depends on message type and read state

### UX intent

The message should not open on a new page. The full reading flow should happen in the modal.

That means:

- the user keeps the context from the list
- reading is faster
- the message action is clearly tied to the currently open item

## Important vs non-important messages

Messages can be marked as important with `isImportant: true` or left as non-important.

Expected behavior:

- the footer action should always be clearly placed at the bottom of the modal
- important messages should show `Confirm read` first
- clicking `Confirm read` should mark the message as read but should not close the modal
- after confirmation, the footer action should change to `Close`
- non-important messages should not show `Confirm read`
- non-important messages should show `Close` immediately in the same button position
- closing a non-important message should mark it as read and remove `New message` from the list
- the top-right `X` should have the same effect as `Close` for non-important messages

This separates messages that require explicit acknowledgement from messages that only need to be read and dismissed.

## Attachments

Attachments are shown as a simple list in the modal.

Expected UX:

- file names should be readable
- each file should have a clear `Download` button
- downloading is a secondary action and should not compete visually with the footer action

## Empty state

If there are no news messages, the page should show:

- icon
- heading `No news available`
- helper text telling the user to check back later

This prevents the page from feeling empty or broken.

## Current technical implementation

The current mockup logic lives in `src/pages/NewsPage.tsx`.

State:

- `selectedNewsId`: controls which message is open in the modal
- `confirmedRead`: local map of read status per message ID

Data:

- messages come from the local `mockNews` constant
- there is currently no backend integration

Routing:

- the page is available on `/news`
- the modal is handled inside the page component, not through a dedicated route

## Development recommendations

For a production implementation, developers should consider:

- fetching messages from an API instead of mock data
- persisting read state per user
- supporting filters such as `all`, `unread`, and `read`
- using one consistent language in the UI
- making status labels fully consistent across cards and modal states
- deciding whether modal state should be deep-linkable via query params or route state

## File references

- `src/pages/NewsPage.tsx`
- `src/App.tsx`
