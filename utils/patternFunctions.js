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

async function checkWithEmptyPattern(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');

    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}


async function checkWithPatternName(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');
    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}
async function checkWithPatternDes(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);


    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');
    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}

async function checkWithPatternNameDes(expect, page, constraint) {


    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

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
    // Reload the page
    await page.reload();

}


async function checkWithPatternNameDesType(expect, page, constraint) {


    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');

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
    // console.log(handler._patternDelete);
    // Reload the page
    await page.reload();
    await deleteConstraint(expect, page, constraint);
    await checkAndCloseToast(expect, page, constraint);



}
async function checkWithPatternNameDesTypeExp(expect, page, constraint) {


    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');
    // Click on the div to focus
    await page.click('div.cm-activeLine.cm-line');
    // Type the text
    await page.keyboard.type('Hello Pattern');

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
    // console.log(handler._patternDelete);
    // Reload the page
    await page.reload();
    await deleteConstraint(expect, page, constraint);
    await checkAndCloseToast(expect, page, constraint);



} async function checkWithPatternNameDesTypeExm(expect, page, constraint) {


    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Pattern');
    // Click on example and type test data 
    await page.click('#example');
    await page.type('#example', 'Hello, I am Tester');
    await page.waitForTimeout(500); // waits for 500 milliseconds


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
    // console.log(handler._patternDelete);
    // Reload the page
    await page.reload();
    await deleteConstraint(expect, page, constraint);
    await checkAndCloseToast(expect, page, constraint);



}




async function createPatternConstraint(expect, page, constraint) {

    await page.waitForLoadState('load');
    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');


    await page.selectOption('#constraintTypes', 'Pattern');
    // Click on the div to focus
    await page.click('div.cm-activeLine.cm-line');
    // Type the text
    await page.keyboard.type('Hello Pattern');
    // Click on example and type test data 
    await page.click('#example');
    await page.type('#example', 'Hello, I am Tester');
    await page.waitForTimeout(500); // waits for 500 milliseconds
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

async function findPatternConstraint(expect, page, constraint) {
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
    // The expected text to be found on the webpage
    const expectedText = "The value must match this pattern: 'Hello Pattern'. The matching is case sensitive.";
    // Check if the locator's text matches the expected text
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText(expectedText);

}



async function editPatternDescription(expect, page, constraint) {
    await page
        .locator('textarea[id=description]')
        .fill('Test constraint edited');
    await page.locator('input[id=name]').fill(constraint);
    await page.locator('textarea[id=description]').fill('Test edited pattern constraint');
    // Click on the div to focus
    await page.click('div.cm-activeLine.cm-line');
    // Type the text
    await page.keyboard.type(' Edited');
    // Wait for 250 milliseconds
    await page.waitForTimeout(250);
    await page.click('#example');
    await page.type('#example', 'Hello, I am updated Tester');
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


async function findEditedPatternConstraint(expect, page, constraint) {

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
        'Test edited pattern constraint'
    );
    // The expected text to be found on the webpage
    const expectedText = "The value must match this pattern: 'Hello Pattern Edited'. The matching is case sensitive.";
    // Check if the locator's text matches the expected text
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText(expectedText);
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



module.exports = {
    checkWithEmptyPattern,
    checkWithPatternName,
    checkWithPatternDes,
    checkWithPatternNameDes,
    checkWithPatternNameDesType,
    checkWithPatternNameDesTypeExp,
    checkWithPatternNameDesTypeExm,
    createPatternConstraint,
    findPatternConstraint,
    editPatternDescription,
    findEditedPatternConstraint
};


