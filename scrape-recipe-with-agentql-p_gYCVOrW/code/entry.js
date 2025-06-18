import { puppeteer } from '@pipedream/browsers';
import { wrap, configure } from 'agentql';

export default defineComponent({
  async run({ steps, $ }) {

    const RECIPE_DATA_QUERY = `
{
  recipe {
      ingredients[] {
        qty
        name
      }
      steps
  }
}
`;
    
    configure({ apiKey: process.env.AGENTQL_API_KEY });
    const browser = await puppeteer.browser();
    const page = await browser.newPage();

    const agentqlPage = await wrap(page);
    await agentqlPage.goto('https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/');


    const data = await agentqlPage.queryData(RECIPE_DATA_QUERY);    
    await browser.close();

    return data;
  },
})