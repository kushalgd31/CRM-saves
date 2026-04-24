# Dashboard Transfer Kit

This folder tracks the file bundle for the `Dashboard`, `KYC`, `Withdraw`, and `Deposit` sections discussed in this project.

## What the script does

Run the script with a destination project root to copy the safe feature files while preserving their relative paths:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\dashboard-transfer\copy-dashboard-bundle.ps1 -DestinationRoot "C:\path\to\other-project"
```

## What still needs manual merge

These files are intentionally not auto-overwritten because they are global integration points in the target project:

- `src/configs/navigationConfig.ts`
- `src/@mock-utils/mswMockAdapter.ts`
- `src/configs/routesConfig.tsx`

## Important data note

The dashboards currently consume data through API service files and React Query hooks, but the endpoints are mock endpoints such as `mock/deposit-dashboard/rows` and `mock/project-dashboard/widgets`.

That means the UI is not hardcoding the values directly, but the current backend source is still mock/static data. To make the destination project use real API data, update the copied service files to call the target project's real endpoints while keeping the response shapes the same.
