import { test, expect } from '@playwright/test';
class ConstraintHandler {
    constructor() {
        this._constraintDelete = false;
    }

    // Getter
    get constraintDelete() {
        return this._constraintDelete;
    }

    // Setter
    set constraintDelete(value) {
        this._constraintDelete = value;
    }
}

// Usage
const handler = new ConstraintHandler();





async function checkTitle(page, expectedTitle, parentSelector, titleSelector) {
    // Wait for the title element to be visible
    await page.waitForSelector(parentSelector, { state: 'visible' });

    // Locate the title directly without using a parent locator
    const parent = await page.locator(parentSelector);

    // Wait for the title element to be visible
    await page.waitForSelector(titleSelector, { state: 'visible' });

    // Locate the title directly without using a parent locator
    const title = await page.locator(titleSelector);

    await expect(title).toHaveText(expectedTitle);
}

async function checkwithDomainName(expect, page, constraint) {
    await page.waitForLoadState('load');
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');


    // Click on save button
    await page.click('#save');

    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(
        `Can't save Constraint "${constraint}" .no Constraint Type is chosen`
    );
    await toast.locator('button').click(); // Close the toast
}






async function checkTitleAfterClick(expect, page, constraint) {
    const editButton = '[id^=edit-]';

    // Wait for the edit button to be visible and then click
    await page.locator(editButton).waitFor({ state: 'visible' });
    await page.locator(editButton).click();

    const titleLocator = '.w-full >> .table.table-compact >> div.h3';

    // Wait for the title element to be visible
    await page.locator(titleLocator).waitFor({ state: 'visible' });

    // Locate the title element and check its text
    const title = await page.locator(titleLocator);
    await expect(title).toHaveText(constraint);

}
async function deleteConstraint(expect, page, constraint) {
    // Search for the constraint
    await page.locator('#constraints-search').fill(constraint);
    // Click on the delete button
    await page.locator('[id^=delete-]').click();

    // Wait until the modal appears
    await page.waitForSelector('.modal');

    // Check the modal title and body text
    await expect(page.locator('.modal-header')).toHaveText('Delete Constraint');
    await expect(page.locator('.modal-body')).toHaveText(`Are you sure you wish to delete Constraint "${constraint}?`);

    // Click the confirm button in the modal footer
    await page.locator('.modal-footer button.variant-filled').click();


    // Set the value
    handler.constraintDelete = true;
}
async function checkAndCloseToast(expect, page, constraint) {
    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(`Constraint "${constraint}" deleted.`);

    // Close the toast
    await toast.locator('button').click();
}

async function checkSaveButtonDisabled(expect, page) {
    // Click on the create button
    await page.locator('#create').click();

    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
}

module.exports = {
    checkTitle,
    checkTitleAfterClick,
    deleteConstraint,
    checkAndCloseToast,
    checkSaveButtonDisabled,

};


