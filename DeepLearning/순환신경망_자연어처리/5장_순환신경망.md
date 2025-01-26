#   1장 신경망 복습
## 1.1 수학과 파이썬 복습
- ### 벡터와 행렬
- ### 행렬의 원소별 연산
- ### 브로드캐스트
  
## 1.2 신경망의 추론
## 1.3 신경망의 학습
## 1.4 신경망으로 문제를 풀다
## 1.5 계산 고속화
## 1.6 정리

#   2장 자연어와 단어의 분산 표현
## 2.1 자연어 처리란
## 2.2 시소러스
## 2.3 통계 기반 기법
## 2.4 통계 기반 기법 개선하기
## 2.5 정리





# 5장 순환 신경망(RNN)
## 5.1 확률과 언어 모델
- 윈도우 크기가 1인 CBOW 모델의 사후 확률 모델링

- 좌우 비대칭으로도 윈도우 크기 설정 가능(ex:왼쪽 2, 오른쪽 0)
- CBOW 모델의 학습 -> 손실 함수를 최소화하는 가중치 매개변수 찾기 -> 학습의 부산물인 단어의 분산 표현 얻기
- 언어 모델(Language Model): 단어 나열에 확률을 부여, 특정한 단어의 시퀀스에 대해 그 시퀀스가 일어날 가능성이 어느 정도인지, 얼마나 자연스러운 시퀀스인지 확률로 평가
ex) 기계 번역, 음성 인식(문장으로써 자연스러운지를 기준으로 순서 매김), 새로운 문장을 생성(확률분포에 따른 적한한 단어 샘플링 가능)
- 언어 모델의 동시 확률 = 사후 확률의 총곱(타깃 단어보다 왼쪽에 있는 모든 단어를 맥락으로)
- 조건부 언어 모델
- 위의 사후 확률을 어떻게 구할 수 있을까?
- CBOW에서는 맥락의 크기를 특정 값으로 한정하여 근사적으로 나타낼 수 있다
여기서는 왼쪽 2개 단어로 한정
2층 마르코프 연쇄(Markov Chain: 미래의 상태가 현재 상태에만 의존해 결정되는 것)
-> 결국 특정 길이로 고정, 긴 맥락이 필요한 문제에 제대로 된 답을 도출 못함, 맥락 크기를 키울 수는 있으나 맥락 안의 단어 순서가 무시된다(bag-of-words)
  ![image](https://github.com/user-attachments/assets/ea29da3f-0fdd-4388-8d82-6bc13717ed56)
- 일반 CBOW 모델: 은닉층에서 더해지므로 순서 무시
- 은닉층 연결(맥락의 단어 순서 고려) <- 신경 확률론적 언어 모델
but 맥락의 크기에 비례해 가중치 매개변수 증가
-> 해결책: RNN, 맥락이 아무리 길더라도 맥락 정보를 기억하는 매커니즘 -> 긴 시계열 데이터 대응 가능
++ word2vec: 단어의 분사 표현을 얻을 목적으로 고안된 기법, 언어 모델로 사용하는 경우는 잘 없음
RNN 이후에 word2vec 제안, RNN으로도 단어의 분산 표현 얻을 순 있으나 개선된 word2vec

## 5.2 RNN이란
- 순환 신경망: 닫힌 경로 필요 -> 데이터가 순환하면서 정보가 끊임없이 갱신 + 과거 정보 기억
- 출력이 2개로 분기하여 하나는 다시 입력으로

![image](https://github.com/user-attachments/assets/1ae6451c-8af4-4ab1-95e8-c9807f7bc171)
-  시계열 데이터: 시간 방향으로 데이터 나열
- 현 계층으로의 입력 + 전 계층의 출력을 입력 받음
- 
![image](https://github.com/user-attachments/assets/b819b6d4-12bb-4c81-8d8f-6fe004028082)

위의 값으로 갱신된다
RNN 계층: 상태를 가지는 계층, 메모리가 있는 계층 / h(t): 은닉 상태, 은닉 상태 벡터
++ Recursive Neural Network: 트리 구조 데이터를 처리하기 위한 신경망

시간 방향으로 펼친 신경망의 오차역전파법 -> BPTT(Backpropagation Through Time)
- 시계열 데이터의 시간 크기가 너무 크면 계산량과 메모리 사용량 등 문제
- 계층이 길어짐에 따라 기울기 값이 조금씩 작아져 역전파되기 전에 0이 되어 소멸 가능
-> Truncated BPTT(적당한 길이로 역전파의 연결을 잘라냄)
순전파의 연결은 끊어지지 않고(데이터를 시간 순서대로 입력해야) 연전파의 연결만 끊어진다, 한 블록 안에서만 역전파 수행하면 된다

![image](https://github.com/user-attachments/assets/71f97e1c-29d3-487d-bcfc-e2a8fdb8d46f)

- Truncated BPTT 미니배치 학습

![image](https://github.com/user-attachments/assets/204f6346-1734-4ebf-aa18-866fa196d657)


- 데이터 입력 시작 위치를 각 미니배치의 시작 위치로 이동, 데이터를 순서대로 입력하다가 끝에 도달하면 다시 처음부터 입력
⭐️데이터를 순서대로 제공, 미니배치별로 데이터를 제공하는 시작 위치 옮기기⭐️

## 5.3 RNN 구현
- 최종적으로 구현해야하는 계층은 다음과 같은 Time RNN 계층(T개의 단계를 한꺼번에 수행)

![image](https://github.com/user-attachments/assets/4fcc6adb-d2a9-4082-aab7-f509ce8adec1)

- 먼저 RNN 계층 구현
 - 은닉 상태 h 계산 순전파 및 역전파(총 3개의 연산:MatMul,+,tanh 로 구성)

![image](https://github.com/user-attachments/assets/48fe323c-240a-4bf3-9d9e-b4b9b0116a88)

- Time RNN 계층에서 다음 블록으로 역전파의 연결은 끊어져있지만 순전파 연결은 이어져있으므로 은닉 상태를 인스턴스 변수 h에 저장해서 다음 블록에 전달
- 은닉 상태 유지 여부에 대한 stateful 인수 필요
![image](https://github.com/user-attachments/assets/dbae5f5d-c351-4cc0-a20a-4db3ed78d83a)

## 5.4 시계열 데이터 처리 계층 구현
-  RNNLM(RNN Language Model): RNN을 사용한 언어 모델

![image](https://github.com/user-attachments/assets/5d8c7eaa-0f22-40a6-9be3-276aa0a0849b)

- 위와 같이 Embedding(단어 id를 단어 벡터로 변환), RNN 계층에서 출력된 은닉 상태가 Affine, softmax함수를 거쳐 확률을 출력하고 손실을 계산하여 학습 및 갱신
시계열 데이터 T개를 한꺼번에 처리하는 Time 계층들
- RNN 계층이 과거에서 현재로 데이터를 계속 흘려보내줌으로써 과거의 정보를 인코딩해 기억할 수 있음 -> RNNLM이 과거 기억 + 다음 예측이 가능해짐
- 손실 계산: 데이터 1개당 평균 손실 계산

## 5.5 RNNLM 학습과 평가
- Truncated BPTT로 학습
- 초기화: RNN 계층, Affine 계층에서 Xavier 초기값 사용

![image](https://github.com/user-attachments/assets/c0080cbf-fbc2-465a-9454-feb356cbb8df)
- 언어 모델의 출력: 과거 단어로부터 다음에 출현할 단어의 확률분포
- 언어 모델의 예측 성능 평가 척도: perplexity(혼란도)
- perplexity는 (데이터 수가 하나일 때 정확히) 확률의 역수 -> 분기수(number of branches)로 이해 가능, 다음에 취할 수 있는 선택사항의 수
- 입력 데이터가 여러개일 경우 다음과 같이 계산

- perplexity가 작을수록 좋은 예측 성능을 갖는다.
> ** RNN 계층을 이용한 조건부 언어 모델은 이론적으로는 그때까지 등장한 모든 단어의 정보를 기억할 수 있다


- 학습한 코드는 여기에서
> https://github.com/syi07030/NLP_study
- 위 코드는 이 책의 코드와 아래의 코드를 바탕으로 작성했습니다.
> https://github.com/WegraLee/deep-learning-from-scratch-2
- 사진 출처 또한 여기에서: https://github.com/WegraLee/deep-learning-from-scratch-2

## 5.6 정리

# 6장 게이트가 추가된 RNN
## 6.1 RNN의 문제점
## 6.2 기울기 소실과 LSTM
## 6.3 LSTM 구현
## 6.4 LSTM을 사용한 언어 모델
## 6.5 RNNLM 추가 개선
## 6.6 정리

# 7장 RNN을 사용한 문장 생성
## 7.1 언어 모델을 사용한 문장 생성
## 7.2 seq2seq
## 7.3 seq2seq 구현
## 7.4 seq2seq 개선
## 7.5 seq2seq를 이용하는 애플리케이션
## 7.6 정리

# 8장 어텐션
## 8.1 어텐션의 구조
## 8.2 어텐션을 갖춘 seq2seq 구현
## 8.3 어텐션 평가
## 8.4 어텐션에 관한 남은 이야기
## 8.5 어텐션 응용
## 8.6 정리

APPENDIX A 시그모이드 함수와 tanh 함수의 미분
## A.1 시그모이드 함수
## A.2 tanh 함수
## A.3 정리

APPENDIX B WordNet 맛보기
## B.1 NLTK 설치
## B.2 WordNet에서 동의어 얻기
## B.3 WordNet과 단어 네트워크
## B.4 WordNet을 사용한 의미 유사도

APPENDIX C GRU
## C.1 GRU의 인터페이스
## C.2 GRU의 계산 그래프
