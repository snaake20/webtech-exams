const puppeteer = require('puppeteer')

let browser
let page

process.on('uncaughtException', e => console.warn(e.stack))

describe('local', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      ignoreDefaultArgs: ['--disable-extensions'],
    })
    page = await browser.newPage()
  })

  it('page loads successfuly and contains a load button', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#loadBtn')
    await page.click('#loadBtn')
  })


  it('can attempt record selection, invalid input', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#selectionTxt')
    await page.$eval('#selectionTxt', el => el.value = 'a')
    await page.waitForSelector('#loadBtn')
    await page.click('#loadBtn')
    await page.waitForNetworkIdle()    
    const selection = await page.$eval("#selection", e => e.textContent)
    expect(selection.trim()).toBe('Nothing was selected')
  })

  it('can attempt record selection, valid input', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#selectionTxt')
    await page.$eval('#selectionTxt', el => el.value = '1')
    await page.waitForSelector('#loadBtn')
    await page.click('#loadBtn')
    await page.waitForNetworkIdle()    
    const selection = await page.$eval("#selection", e => e.textContent)
    expect(selection.trim()).toBe('1 jim engineer')
  })


  it('input is cleared on success', async () => {
    await page.goto('http://localhost:8080')
    await page.waitForSelector('#selectionTxt')
    await page.$eval('#selectionTxt', el => el.value = '1')
    await page.waitForSelector('#loadBtn')
    await page.click('#loadBtn')
    await page.waitForNetworkIdle()    
    const selectionTxt = await page.$eval("#selectionTxt", e => e.value)
    expect(selectionTxt).toBe('')
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })
})