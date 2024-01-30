import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
const { checkTitle, checkAndCloseToast, deleteConstraint } = require('./utils/uniqueFunction');
const { findRangeConstraint, createRangeConstraint, findEditedRangeConstraint, editRangeDescription } = require('./utils/rangeFunctions');

import { login, host } from '../shared';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

test.describe('Range Constraint', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await login(page);
        await page.goto(`${host}/rpm/constraints/`);
    });

    test.afterAll(async () => {
        await page.close();
    });
    test.afterEach(async ({ page }) => {
        if (deleteConstraint === false) {
            // Delete the constraint
            await deleteConstraint(expect, page, constraint);
            await checkAndCloseToast(expect, page, constraint);
        }
    });


    const constraint = `test-${+Date.now()}`;
    test.describe('Create Range Constraint', () => {
        test('should match the expected title', async () => {
            await checkTitle(page, 'Constraints', '.w-full >> .table.table-compact', 'h1.h1');
        });


        test('Create Domain Constraint', async () => {
            await createRangeConstraint(expect, page, constraint);
        });
        test('Find the new constraint in the table', async () => {
            await findRangeConstraint(expect, page, constraint);
        });

        test('Delete new constraint', async () => {
            await deleteConstraint(expect, page, constraint);
        });

        test('Check toast', async () => {
            await checkAndCloseToast(expect, page, constraint);
        });

    });


    test.describe('Edit new constraint', () => {
        test('should match the expected title', async () => {
            await checkTitle(page, 'Constraints', '.w-full >> .table.table-compact', 'h1.h1');
        });

        test('Create Range Constraint', async () => {
            await createRangeConstraint(expect, page, constraint);
        });

        test('Find the new constraint in the table', async () => {
            await findRangeConstraint(expect, page, constraint);
        });

        // Check the title
        test('Title', async () => {
            await page.locator('[id^=edit-]').click(); // Click on the edit button

            const title = await page
                .locator('.w-full', { has: page.locator('.table.table-compact') })
                .locator('div.h3');
            await expect(title).toHaveText(constraint);
        });
        test('Edit description pattern', async () => {
            await editRangeDescription(expect, page, constraint);
        });

        test('Find the edited constraint in the table', async () => {
            await findEditedRangeConstraint(expect, page, constraint);
        });
        test('Delete new constraint', async () => {
            await deleteConstraint(expect, page, constraint);
        });

        test('Check toast', async () => {
            await checkAndCloseToast(expect, page, constraint);
        });
    });
});


