import requests
from bs4 import BeautifulSoup
from datetime import datetime
from time import sleep
import csv

def extract_book_urls(page_url):
    '''collect the book title and url for every book on all page urls'''
    book_list = []

    while page_url:
        print('scraping ' + page_url + '...')
        res = requests.get(page_url)
        soup = BeautifulSoup(res.text, "html.parser")
        books = soup.find_all(class_="product_pod")

        for book in books:
            book_title = book.find("img").attrs["alt"]
            book_url = "https://books.toscrape.com/catalogue/" + book.find("a").attrs["href"][6:]
            book_list.append({"title": book_title,
                              "url": book_url})

        sleep(1)  # pause 1 second after each request

        if check_next_page(page_url) != None:
            page_url = "https://books.toscrape.com/catalogue/category/books_1/" + check_next_page(page_url)
        else:
            break

    return book_list

def check_next_page(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "html.parser")
    next_btn = soup.find(class_= "next")
    return next_btn.find("a").attrs["href"] if next_btn else None

# extract title and url from all books
book_list = extract_book_urls("https://books.toscrape.com/catalogue/page-1.html")

# save data to CSV file
with open("book_urls.csv", "w") as csv_file:
    writer = csv.writer(csv_file, delimiter = ";")
    writer.writerow(["title", "url", "date_time"])
    now = datetime.now()
    for book in book_list:
        writer.writerow([book["title"], book["url"], now])
