from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

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
    
time.sleep(1)

# 人数選択
try:
    radio_player = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "player12")))
    radio_player.click()
except:
    print('nothing selected!')
    
time.sleep(1)
    
    
# ゲーム表作成
try:
    create = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "create")))
    create.click()
except:
    print('nothing created!')
    
time.sleep(1)


# 待機者取得
All_waiting = []
waitings = driver.find_elements(By.CLASS_NAME, "waiting")
for waiting in waitings:
    ul = waiting.find_element(By.TAG_NAME, "ul")
    lis = ul.find_elements(By.TAG_NAME, "li")
    
    for li in lis:        
        All_waiting.append(int(li.text))
    
    time.sleep(1)

print(All_waiting)

# 人数計算
for i in range(12):
    print(f'{i+1}: {All_waiting.count(i + 1)}')

time.sleep(1)


# ヒストグラム作成
plt.hist(All_waiting, bins=12)
plt.show()



driver.implicitly_wait(3)
# スクレイピング終了
driver.quit()

# print(f'h1_text: {h1_text}\n')




    

