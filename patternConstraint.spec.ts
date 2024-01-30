import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
const { checkTitle, checkIncompleteForm, checkSaveButtonDisabled, checkAndCloseToast, deleteConstraint } = require('./utils/uniqueFunction');
const { findPatternConstraint, checkWithEmptyPattern, checkWithPatternName, checkWithPatternDes, checkWithPatternNameDes, checkWithPatternNameDesType, checkWithPatternNameDesTypeExp, checkWithPatternNameDesTypeExm, createPatternConstraint, findEditedPatternConstraint, editPatternDescription, patternConstraint } = require('./utils/patternFunctions');

import { login, host } from '../shared';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

test.describe('Pattern Constraint', () => {
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
    test.describe('Iterations for fields validation', () => {
        test('Check title ', async () => {
            //Check with title name 
            await checkTitle(page, 'Constraints', '.w-full >> .table.table-compact', 'h1.h1');
        });
        test('Check with Empty Pattern', async () => {
            await checkWithEmptyPattern(expect, page, constraint);
        });


        test('Check with only pattern name ', async () => {
            await checkWithPatternName(expect, page, constraint);
        });
        test('Check with only pattern description ', async () => {
            await checkWithPatternDes(expect, page, constraint);
        });

        test('Check with only pattern name and description ', async () => {
            await checkWithPatternNameDes(expect, page, constraint);
        });
        test('Check with only pattern name, description and type ', async () => {
            await checkWithPatternNameDesType(expect, page, constraint);
        });
        test('Check with only pattern name, description, type and expression', async () => {
            await checkWithPatternNameDesTypeExp(expect, page, constraint);
        });
        test('Check with only pattern name, description, type and example', async () => {
            await checkWithPatternNameDesTypeExm(expect, page, constraint);
        });



    });


    test.describe('Create Pattern Constraints', () => {
        test('should match the expected title', async () => {
            await checkTitle(page, 'Constraints', '.w-full >> .table.table-compact', 'h1.h1');
        });


        test('Create Domain Constraint', async () => {
            await createPatternConstraint(expect, page, constraint);
        });
        test('Find the new constraint in the table', async () => {
            await findPatternConstraint(expect, page, constraint);
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

        test('Create Pattern Constraint', async () => {
            await createPatternConstraint(expect, page, constraint);
        });

        test('Find the new constraint in the table', async () => {
            await findPatternConstraint(expect, page, constraint);
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
            await editPatternDescription(expect, page, constraint);
        });

        test('Find the edited constraint in the table', async () => {
            await findEditedPatternConstraint(expect, page, constraint);
        });
        test('Delete new constraint', async () => {
            await deleteConstraint(expect, page, constraint);
        });

        test('Check toast', async () => {
            await checkAndCloseToast(expect, page, constraint);
        });
    });
});

