# Stage 1

## Notification System Design - Priority Inbox

### Problem Statement
Users are missing out on important notifications due to the high volume of incoming updates. We need to build a "Priority Inbox" that identifies and displays the top `N` most relevant notifications.

### Approach
The priority of a notification is determined by two main factors:
1. **Type Importance (Weight):** Some categories of notifications are inherently more important than others.
2. **Time Relevance (Recency):** A newer notification is more relevant than an older one of the same type.

### Formula
`Priority Score = Weight(Type) × Recency`

#### 1. Weights
I have assigned static weights based on the expected criticality for a university student:
- **Placement (Weight: 3):** Highest priority. Missing a placement drive deadline or update can be severely detrimental to a student's career.
- **Result (Weight: 2):** Medium-high priority. Academic results are critical but generally less time-sensitive in terms of actionable response compared to placement.
- **Event (Weight: 1):** Lowest priority. General campus events are informational and less critical.

#### 2. Recency Function
Recency must decay as time passes. To prevent very old placement notifications from overpowering very new event notifications forever, we use an inverse time decay function:
`Recency = 1 / (1 + minutes_since_timestamp)`

- A notification from right now has a recency score of `1`.
- A notification from 10 minutes ago has a recency score of `1/11 ≈ 0.09`.

#### 3. Execution
1. Fetch all notifications from the protected API.
2. For each notification, calculate the `Priority Score`.
3. Sort the array of notifications in descending order based on this score.
4. Slice the top 10 notifications to populate the Priority Inbox.

### Complexity
- **Time Complexity:** `O(N log N)` where `N` is the total number of unread notifications, due to sorting.
- **Space Complexity:** `O(N)` to store the scored notifications in memory before slicing.
