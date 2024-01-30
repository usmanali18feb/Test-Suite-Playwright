import { test, expect } from '@playwright/test';


async function createRangeConstraint(expect, page, constraint) {
    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');


    await page.selectOption('#constraintTypes', 'Range');
    // Adding lowebound value '1'
    await page.fill('#lowerbound', '1');
    // Adding upperbound value '5'
    await page.fill('#upperbound', '5');
    // Click on save button
    await page.click('#save');
    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');
    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(
        `Constraint "${constraint}" saved.`
    );
    await toast.locator('button').click(); // Close the toast
}




async function findRangeConstraint(expect, page, constraint) {
    // Search for the constraint
    await page.locator('#constraints-search').fill(constraint);
    // Get the row
    const row = page.locator('[id^=constraints-row-]');
    await expect(row).toHaveCount(1);
    // Get the index of the constraint
    const id = (await row.getAttribute('id'));
    const index = id.split('-')[2];
    // Check the values
    await expect(page.locator(`#constraints-name-${index}`)).toHaveText(constraint);
    await expect(page.locator(`#constraints-description-${index}`)).toHaveText(
        'Test constraint'
    );
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText(
        'The value must be between 1 (including) and 5 (including).');
}

async function editRangeDescription(expect, page, constraint) {
    await page
        .locator('textarea[id=description]')
        .fill('Test constraint edited');
    await page.locator('input[id=name]').fill(constraint);

    // Edit lowebound value '5'
    await page.fill('#lowerbound', '5');

    // Edit upperbound value '10'
    await page.fill('#upperbound', '10');
    await page.locator('button[id=save]').click();

    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(
        `Constraint "${constraint}" saved.`
    );
    await toast.locator('button').click(); // Close the toast
}



async function findEditedRangeConstraint(expect, page, constraint) {

    // Search for the constraint
    await page.locator('#constraints-search').fill(constraint);
    // Get the row
    const row = page.locator('[id^=constraints-row-]');
    await expect(row).toHaveCount(1);
    // Get the index of the constraint
    const id = (await row.getAttribute('id'));
    const index = id.split('-')[2];
    // Check the values
    await expect(page.locator(`#constraints-name-${index}`)).toHaveText(constraint);
    await expect(page.locator(`#constraints-description-${index}`)).toHaveText(
        'Test constraint edited'
    );
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText(
        'The value must be between 5 (including) and 10 (including).');

}

module.exports = {

    createRangeConstraint,

    findRangeConstraint,

    editRangeDescription,
    findEditedRangeConstraint
};


