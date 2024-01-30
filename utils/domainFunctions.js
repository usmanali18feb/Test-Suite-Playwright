import { test, expect } from '@playwright/test';

async function checkWithEmptyDomian(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Domain');

    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}


async function checkWithDomainName(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Domain');
    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}
async function checkWithDomainDes(expect, page, constraint) {
    await page.waitForLoadState('load');

    // Click on the create button
    await page.locator('#create').click();
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);


    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint');
    // Select an option from dropdown
    await page.selectOption('#constraintTypes', 'Domain');
    // Get the save button
    const saveButton = page.locator('button#save');

    // Check if the save button is disabled
    await expect(saveButton).toBeDisabled();
    // Reload the page
    await page.reload();

}

async function checkWithDomainNameDes(expect, page, constraint) {


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


async function checkWithDomainNameDesType(expect, page, constraint) {


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
    await page.selectOption('#constraintTypes', 'Domain');

    // Click on save button
    await page.click('#save');

    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(
        `Can't save Constraint "${constraint}" .Domain is not defined`
    );
    await toast.locator('button').click(); // Close the toast
    // Reload the page
    await page.reload();

}





async function createDomainConstraint(expect, page, constraint) {

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
    await page.selectOption('#constraintTypes', 'Domain');

    // Click on the div to focus
    await page.click('div.cm-activeLine.cm-line');
    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Type the text
    await page.keyboard.type('Hello Testing Domain');

    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Click on save button
    await page.click('#save');

    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(
        `Constraint "${constraint}" saved.`
    );

    // Close the toast
    await toast.locator('button').click();
}




async function findDomainConstraint(expect, page, constraint) {
    // Search for the constraint
    await page.locator('#constraints-search').fill(constraint);

    // Get the row
    const row = page.locator('[id^=constraints-row-]');
    await expect(row).toHaveCount(1);

    // Get the index of the constraint
    const id = await row.getAttribute('id');
    const index = id.split('-')[2];

    // Check the values
    await expect(page.locator(`#constraints-name-${index}`)).toHaveText(constraint);
    await expect(page.locator(`#constraints-description-${index}`)).toHaveText(
        'Test constraint'
    );
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText(
        'The value must be one of these items: Hello Testing Domain.'
    );
}








async function editDomainDescription(expect, page, constraint) {
    // Fill in the description textarea
    await page.locator('textarea[id=description]').fill('Test constraint edited');

    // Fill in the name input
    await page.locator('input[id=name]').fill(constraint);

    // Fill in the edited description
    await page.locator('textarea[id=description]').fill('Test edited domain constraint');

    // Click on the div to focus
    await page.click('div.cm-activeLine.cm-line');

    // Type additional text
    await page.keyboard.type(' Edited');

    // Wait for 500 milliseconds
    await page.waitForTimeout(500);

    // Click on save button
    await page.locator('button[id=save]').click();

    // Wait until the toast appears
    await page.waitForSelector('.toast[data-testid=toast] .text-base');

    // Check the toast message
    const toast = await page.locator('.toast[data-testid=toast]');
    await expect(await toast.locator('.text-base')).toHaveText(`Constraint "${constraint}" saved.`);

    // Close the toast
    await toast.locator('button').click();
}


async function findEditedDomainConstraint(expect, page, constraint) {

    // Search for the constraint
    await page.locator('#constraints-search').fill(constraint);

    // Get the row
    const row = page.locator('[id^=constraints-row-]');
    await expect(row).toHaveCount(1);

    // Get the index of the constraint
    const id = await row.getAttribute('id');
    const index = id.split('-')[2];

    // Check the values
    await expect(page.locator(`#constraints-name-${index}`)).toHaveText(constraint);
    await expect(page.locator(`#constraints-description-${index}`)).toHaveText('Test edited domain constraint');
    await expect(page.locator(`#constraints-formalDescription-${index}`)).toHaveText('The value must be one of these items: Hello Testing Domain Edited.');
}


module.exports = {


    createDomainConstraint,
    findDomainConstraint,
    checkWithEmptyDomian,
    checkWithDomainName,
    checkWithDomainNameDes,
    checkWithDomainDes,
    checkWithDomainNameDesType,

    editDomainDescription,
    findEditedDomainConstraint
};


