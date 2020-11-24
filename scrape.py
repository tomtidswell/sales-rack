from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium import webdriver
from pprint import pprint
import csv
import requests
from requests_html import HTMLSession
from bs4 import BeautifulSoup
from pymongo import MongoClient


dbclient = MongoClient('mongodb://localhost/')
sales_data = dbclient["sales"]
collection = sales_data["products"]
collection.drop()

# mydict = {
#     "name": "Pure Cotton Luxury Spa Towel",
#     "prices": ['Sale price', '£6.00 - £18.00', 'Previous price'],
#     "url": "https://www.marksandspencer.com/pure-cotton-luxury-spa-towel/p/hbp60467039?color=WHITE#intid=prodColourId-60467042",
#     "badge": "40% off"
# }
# collection.insert_one(mydict)



feedname = "marksandspencer-home"
site = "https://www.marksandspencer.com"
page = "/l/offers/home-offers"

# session = HTMLSession()
# resp = session.get(f"{site}{page}")
# resp.html.render(sleep=1, scrolldown=10)
# # print(resp.html.html)

# page = requests.get(f"{site}{page}")
# soup = BeautifulSoup(page.text, 'html.parser')
# # product_grid = soup.find_all('ul', class_='grid')
# # print(product_grid)
# grid_items = soup.find_all('li', class_='grid__tile')
# products = []

# for p in grid_items:
#     p_data = {}
#     p_data['name'] = p.find(class_='product__title').text
#     p_data['prices'] = []
#     for child in p.find(class_='sale-price').descendants:
#         if isinstance(child, type('bs4.element.NavigableString')):
#             p_data['prices'].append(child.string)
#     p_data['url'] = f"{site}{p.a['href']}"
#     p_data['badge'] = p.find(class_='product__badge').text
#     products.append(p_data)
#     # collection.insert_one(p_data)
#     print(p.find_all('img'))




# with open(f'data/{feedname}.csv', 'w') as f:
#     w = csv.DictWriter(f, products[0].keys())
#     w.writeheader()
#     for row in products:
#         w.writerow(row)


class MarksAndSpencerScraper:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)

    def close_browser(self):
        self.driver.close()
        self.driver.quit()

    def get_element(self):
        """Extracts and returns company links (maximum number of company links for return is provided)."""
        self.driver.get(f"{site}{page}")
        self.wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "ul.grid")))
        scrolled_to = 0
        bodyHeight = self.driver.find_element(
            By.TAG_NAME, "body").get_attribute('offsetHeight')

        while scrolled_to < int(bodyHeight):
            scrolled_to += 200
            self.driver.execute_script(f"window.scrollTo(0, {scrolled_to})")
        return [el.get_attribute('innerHTML') for el in self.driver.find_elements_by_css_selector("ul.grid > li")]

    def get_product_data(self, product_element):
        """Extracts and prints out product information."""
        p = BeautifulSoup(product_element, 'html.parser')
        p_data = {}
        p_data['name'] = p.find(class_='product__title').text
        p_data['prices'] = []
        for child in p.find(class_='sale-price').descendants:
            if isinstance(child, type('bs4.element.NavigableString')):
                p_data['prices'].append(child.string)
        p_data['url'] = f"{site}{p.a['href']}"
        p_data['badge'] = p.find(class_='product__badge').text
        p_data['images'] = [{'source': img['src'], 'class': img['class']}
                            for img in p.find_all('img')]

        collection.insert_one(p_data)
        print(p_data)
        return p_data


if __name__ == '__main__':
    scraper = MarksAndSpencerScraper()

    products = scraper.get_element()
    for product in products:
        product_data = scraper.get_product_data(product)
        pprint(product_data)
        print("------")
    
    scraper.close_browser()
