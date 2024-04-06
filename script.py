from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()

driver.get("http://tutti2056.github.io/doubles_maker/")
time.sleep(2)

# コート選択
radio_court = driver.find_element(by=By.ID, value="court2")

if radio_court.is_enabled():
    radio_court.click()
    # print('court selected!')
else:
    print('nothing selected!')
    
time.sleep(1.5)

# 人数選択
try:
    radio_player = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "player12")))
    radio_player.click()
    # print('player selected!')
except:
    print('nothing selected!')
    
time.sleep(1.5)

# ゲーム表作成
try:
    create = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "create")))
    create.click()
    # print('pairing created normally!')
except:
    print('nothing created!')
    
time.sleep(1.5)

# 待機者取得
waitings = driver.find_elements(By.CLASS_NAME, "waiting")
for waiting in waitings:
    ul = waiting.find_element(By.TAG_NAME, "ul")
    lis = ul.find_elements(By.TAG_NAME, "li")
    
    for li in lis:        
        print(li.text, end=',')
    
    print('\n')
    time.sleep(1.5)


# h1取得
h1_element = driver.find_element(by=By.TAG_NAME, value="h1")
h1_text = h1_element.text

driver.implicitly_wait(5)


# スクレイピング終了
driver.quit()

# print(f'h1_text: {h1_text}\n')




    

