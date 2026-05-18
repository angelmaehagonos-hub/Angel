# Security Specification - Gourmet Garden

## Data Invariants
1. A user profile must have a valid UID matching the document ID.
2. Users can only read and write their own profile data.
3. CreatedAt timestamps are immutable and must match request.time during creation.

## The "Dirty Dozen" Payloads
1. Attempt to create a user profile with a UID that doesn't match request.auth.uid.
2. Attempt to update another user's profile.
3. Attempt to delete another user's profile.
4. Attempt to update a profile and change the `createdAt` field.
5. Attempt to create a profile without a `uid` field.
6. Attempt to update a profile and inject a "roles" field.
7. Attempt to read all user profiles (blanket read).
8. Attempt to update a profile with a 2MB string in `displayName`.
9. Attempt to create a profile with a future timestamp in `createdAt`.
10. Attempt to update a profile with a non-string `email`.
11. Attempt to delete own profile (if disallowed, or test if allowed).
12. Attempt to create a profile while not signed in.

## Test Runner Plan
- Verify that only the authenticated user can manage their own profile.
- Verify schema validation for the user profile.
- Verify immutability of certain fields.
