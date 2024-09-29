# React Query Challenge - Implement Hooks and Optimistic Updates

This project focuses on creating custom hooks for querying and mutating cart data using React Query. The goal is to extend the cart functionality by implementing **retry mechanisms** for queries and mutations, as well as **optimistic updates** for product additions.

## Steps to Complete

### 1. Switch to the `challenge-react-query` Branch

Ensure you are on the correct branch where the hooks are scaffolded but not yet fully implemented.

```bash
git checkout challenge-react-query
```

### 2. Implement Hooks

You will need to implement the following hooks to perform retries and optimistic updates:

-   **`useCartProducts`**: This hook should handle fetching cart products with retries on failure. It should provide an indication of loading, success, and error states.
-   **`useAddProduct`**: This hook is responsible for adding products to the cart. You need to implement the logic for optimistic updates to provide a smooth user experience before the actual server response.

#### Optimistic Updates

An optimistic update should allow users to see changes in their cart immediately, without waiting for the server's response. Make sure to add the `isOptimistic` flag in your product interface to differentiate between actual and optimistic data.

### 3. Test Your Work

#### Unit Testing Core Logic

Run the following command to make sure all core logic for creating and adding products works as expected:

```bash
pnpm run test:dev
```

Ensure that your tests cover:

-   The retry mechanism for querying products
-   Retry logic for adding a product when it fails
-   The behavior of optimistic updates and product states

#### Manual Testing of Optimistic Updates and Retries

After implementing the hooks, manually test the optimistic update functionality and retry behavior in the application by running:

```bash
pnpm run dev
```

Check both before and after optimistic updates:

1. Observe how product addition behaves without optimistic updates.
2. Enable optimistic updates and ensure the cart reflects the added product immediately, even before the server confirms it.

---

Following these steps will ensure that all aspects of querying, mutations, and optimistic updates are functioning as expected.
