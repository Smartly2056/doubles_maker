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
time.sleep(0.5)

# コート選択
radio_court = driver.find_element(by=By.ID, value="court2")

if radio_court.is_enabled():
    radio_court.click()
    # print('court selected!')
else:
    print('nothing selected!')
    
time.sleep(0.5)

# 人数選択
try:
    radio_player = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "player12")))
    radio_player.click()
except:
    print('nothing selected!')
    
time.sleep(0.5)
    
    
# ゲーム表作成
try:
    create = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "create")))
    create.click()
except:
    print('nothing created!')
    
time.sleep(0.5)


# 待機者取得
All_waiting = []
waitings = driver.find_elements(By.CLASS_NAME, "waiting")
for waiting in waitings:
    ul = waiting.find_element(By.TAG_NAME, "ul")
    lis = ul.find_elements(By.TAG_NAME, "li")
    
    for li in lis:        
        All_waiting.append(int(li.text))
    
    time.sleep(0.5)

print(All_waiting)

# 人数計算
for i in range(12):
    print(f'{i+1}: {All_waiting.count(i + 1)}')

time.sleep(0.5)


# ヒストグラム作成
plt.title('Waiting Counter')
plt.xlabel('Player Number')
plt.xticks([1,2,3,4,5,6,7,8,9,10,11,12])

plt.hist(All_waiting, bins=range(min(All_waiting), max(All_waiting)+2), edgecolor='black')
plt.show()



driver.implicitly_wait(1)
# スクレイピング終了
driver.quit()





    

