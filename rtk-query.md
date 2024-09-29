# RTK Query Challenge - Testing Optimistic Updates and Retries

This project uses **RTK Query** to manage querying and mutations for cart functionality. The hooks, store, and API are already implemented, but you need to complete the optimistic updates and retry mechanisms.

## Steps to Complete

### 1. Switch to the Correct Branch

Ensure you are on the branch where the RTK Query version is implemented.

```bash
git checkout challenge-rtk-query
```

### 2. Understand the Implemented Hooks

-   **`useCartProducts`**: This hook fetches the products in the cart using RTK Query.
-   **`useAddProduct`**: This hook adds products to the cart. It includes an optimistic update mechanism that immediately reflects product changes in the cart before the server confirms the addition.

### 3. Test the Implementation

#### Unit Testing

Run the following command to ensure all core logic for querying and adding products works correctly:

```bash
pnpm run test:dev
```

Complete optimistic updated and retry functionality:

-   The retry logic for fetching cart products (`useCartProducts`)
-   Retry and error handling for adding products (`useAddProduct`)
-   Behavior of optimistic updates and their impact on the cart

#### Manual Testing of Optimistic Updates and Retries

After verifying that the unit tests pass, manually test the optimistic updates and retry mechanisms by running:

```bash
pnpm run dev
```

Check both before and after optimistic updates:

1. Observe how product addition behaves without optimistic updates.
2. Enable optimistic updates and ensure the cart reflects the added product immediately, even before the server confirms it.
