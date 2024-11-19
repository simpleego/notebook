# 알라딘 서점 API 예제
```py
import os
import sys
import requests
import json

'''
QueryType=ItemNewAll, 
MaxResults=100, 
start=1, 
SearchTarget=Book, 
output=js,
Version=20131101, 
CategoryId=50993은 
각각 신간 도서 리스트, 
최대 100페이지까지 검색,
검색은 1페이지부터 시작, 
결과는 json형식으로, api버전은 20131101년걸로, 
카테고리는 50993(2000년대 이후 한국소설)으로 된 데이터를 요청한 것인데요. 
이러한 요청 변수들은 사이사이 &으로 이어주면 다른 서버에 한꺼번에 묶여서 요청이 갈 수 있어요.

'''

#키와 url 정의
key = "ttbsimpleego1150001"
url = f"http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey={key}&QueryType=ItemNewAll&MaxResults=300" \
      "&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=8467"
      
      
#request 보내기
response = requests.get(url)

#받은 response를 json 타입으로 바뀌주기
response_json = json.loads(response.text)
#확인
print(response_json['item'][0]['author'])
print(response_json['item'][0]['title'])
print(response_json['item'][0]['priceSales'])

item_list = response_json['item']

print(len(item_list))


title_list = []
for i in range(len(item_list)):
    title = item_list[i]['title']
    author = item_list[i]['author']
    title_list.append(title+','+author)
    
count=0
for i in title_list:
    count+=1
    print(count,': ',i)

```
