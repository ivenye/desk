#!/bin/bash

echo "🧪 Running OpenClaw Studio Tests"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies first..."
    npm install
    echo ""
fi

# Run linter
echo "🔍 Running ESLint..."
npm run lint
LINT_EXIT=$?

# Run type check
echo ""
echo "📝 Running TypeScript type check..."
npx tsc --noEmit
TSC_EXIT=$?

# Run tests (if test script exists)
echo ""
echo "🧪 Running tests..."
if grep -q '"test"' package.json; then
    npm test
    TEST_EXIT=$?
else
    echo "⚠️  No test script found in package.json"
    TEST_EXIT=0
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $LINT_EXIT -eq 0 ]; then
    echo "✅ Linting: PASSED"
else
    echo "❌ Linting: FAILED"
fi

if [ $TSC_EXIT -eq 0 ]; then
    echo "✅ Type Check: PASSED"
else
    echo "❌ Type Check: FAILED"
fi

if [ $TEST_EXIT -eq 0 ]; then
    echo "✅ Tests: PASSED"
else
    echo "❌ Tests: FAILED"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Exit with error if any check failed
if [ $LINT_EXIT -ne 0 ] || [ $TSC_EXIT -ne 0 ] || [ $TEST_EXIT -ne 0 ]; then
    exit 1
fi

echo ""
echo "🎉 All checks passed!"
exit 0
