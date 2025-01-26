# 4장 word2vec 속도 개선
## 4.1 word2vec 개선
- 앞 장에서 구현한 간단한 word2vec의 CBOW 모델의 문제점: 말뭉치 크기가 많이 크다면 그에 따라 계산량도 굉장히 많아진다 (아래와 같은 예시)

![image](https://github.com/user-attachments/assets/360a45a8-9ad5-4275-9912-8941c9677af7)
입력층의 원핫 표현과 가중치 W_in의 곱 계산 <- Embedding 계층 도입
- 기존의 원핫 표현과 MatMul 계층의 가중치 곱은 결국 가중치 행렬의 특정 행을 추출하는 것

![image](https://github.com/user-attachments/assets/8bf950cb-97fa-43f7-b246-830ad2d01a1f)
- 사실상 계산이 필요없으므로 가중치 행렬으로부터 단어 id에 해당하는 행을 추출하는 계층인 Embedding 계층을 MatMul 계층 대신 도입
++ 단어의 밀집벡터 표현을 -> 단어 임베딩 or 단어의 분산 표현 (통계기반기법-> distributional representation, 신경망 추론기반기법 -> distributed representation)
- 순전파 & 역전파

![image](https://github.com/user-attachments/assets/9a0674d0-c739-4c32-8141-4138c68bb5a5)

- 미니배치 처리일 때 idx에 중복된 원소가 있을 수 있으므로 역전파시 idx가 가리키는 장소에 할당이 아닌 더하기를 해야 함
-> 이렇게 함으로써 메모리 사용량 ⬇️, 계산량도 ⬇️
은닉층과 가중치 W_out의 곱 및 softmax 계산 <- Negative Sampling 손실 함수 도입
- softmax 대신 negative sampling 사용하여 말뭉치가 커지더라도 계산량을 낮은 수준에서 일정하게 억제 가능
- 핵심: 다중 분류 -> 이중 분류(출력층 뉴런 하나만 필요)
(ex: "맥락이 'you'와 'goodbye'일 때 타깃 단어는 'say' 입니까?" yes/no)
![image](https://github.com/user-attachments/assets/f6b31a19-be08-4859-85d1-dfc18d979bdb)

- 단어 하나에 대해서만 그 점수를 계산 -> sigmoid 활성화 함수(0~1 사이의 값 출력) -> 확률
++ 다중 분류 경우: softmax, 교차 엔트로피 오차 / 이중 분류 경우: sigmoid, 교차 엔트로피 오차
![image](https://github.com/user-attachments/assets/dd6cb5cd-c69f-4c1e-9b5f-c6f36d730099)

- 정답 레이블 t: 정답이면 1, -logy 출력 / 오답이면 0, -log(1-y) 출력
  
![image](https://github.com/user-attachments/assets/5b847d7f-8981-4c66-9881-f6cfb77eba4b)




## 4.2 word2vec 개선 ②
## 4.3 개선판 word2vec 학습
## 4.4 word2vec 남은 주제
## 4.5 정리
