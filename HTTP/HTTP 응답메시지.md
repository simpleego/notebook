## 1. 1로 시작하는 경우 = Informational responses
>  요청을 받았으며 프로세스를 계속함
> 
| code | Description        |  설명     |
| :--: | :--- | :--- |
| 100  | Continue           | 요청의 시작 부분이 받아들여졌으며 클라이언트는 계속 이어서 보내야 함 이미 요청을 완료한 경우에는 무시해도 됨 |
| 101  | Switching Protocol | 요청 헤더의 Update 필드 중 하나로 서버가 프로토콜을 변경함                                                   |
| 102  | Processing         | 서버가 요청을 수신하고 이를 처리하고 있으나 제대로 된 응답을 알려줄 수 없음                                  |


## 2. 2로 시작하는 경우 = Success
<span style="background-color:red">요청을 성공적으로 받았으며 인식했고 수용했음</span>
| code | description                  | 설 명   |
| :--: | :--- | :--- |
| 200  | OK                            | 요청을 정상적으로 처리함                                                                    |
| 201  | Created                       | 성공적으로 생성에 대한 요청을 받었으며 서버가 새 리소스를 작성함 (대개 POST, PUT일 때)      |
| 202  | Accepted                      | 요청을 접수했지만 아직 처리하지 않음 (요청은 적절했음)                                      |
| 203  | Non-Authoritative Information | 요청을 성공적으로 처리했지만 다른 소스에서 수신된 정보를 제공함, 검증이 되지 않은 상태      |
| 204  | No Content                    | 서버가 요청을 성공적으로 처리했지만 제공할 컨텐츠는 없음                                    |
| 205  | Reset Content                 | 서버가 요청을 성공적으로 처리했지만 새로운 내용을 확인해야 함을 알려줌 (새로고침 등을 이용) |
| 206  | Partial Content               | 서버가 GET 요청의 일부만 성공적으로 처리함 - Content-Range와 Date 헤더를 반드시 포함        |
| 207  | Multi Status                  | 여러 개의 리소스가 여러 status code를 갖고 있는 상황에서 적절한 정보 전달                   |
| 208  | Already Reported              | DAV에서 사용                                                                                |

## 3. 3로 시작하는 경우 = Redirection  
> 클라이언트의 요청에 대해 적절한 위치를 제공하거나 대안의 응답을 제공

| code | description        | 설명                                                                                   |
| :--: | :--- | :--- |
|  300 |   Multiple Choice  | 클라이언트가 동시에 여러 응답이 가능한 요청을 보냈을 경우 클라이언트의 선택지를 반환             |
|  301 |  Moved Permanently | 요청한 리소스의 URI가 변경됨 -> 변경된 URI에 대한 정보와 함께 응답                               |
|  302 |        Found       | 요청한 리소스의 URI가 일시적으로 변경된 것이므로 원래 요청했던 URI로 요청해야 함                 |
|  303 |      See Other     | 클라이언트가 요청한 작업을 하기 위해서는 다른 URI에서 얻어야 할 때 클라이언트에게 줌             |
|  304 |    Not Modified    | 이전의 요청과 비교하여 달라진 것이 없음 (캐시를 목적으로 사용됨)                                 |
|  305 |      Use Proxy     | proxy를 통해 요청되어야 함                                                                       |
|  306 |       Unused       | 지금은 사용하지 않는 코드 -> 추후 사용을 위해 예약되어 있음                                      |
|  307 | Temporary Redirect | 302와 동일하나 클라이언트가 보낸 HTTP 메소드도 변경하면 안됨                                     |
|  308 | Permanent Redirect | 요청한 리소스가 영구적으로 다른 URI에 위치하고 있음, 301과 동일하나 HTTP 메소드도 변경하지 말 것 |

## 4. 4로 시작하는 경우 = Client Error  
> 클라이언트의 잘못된 요청  

| code | description                     | 설 명                                                                                           |
| :--: | :--- | :--- |
| 400  | Bad Request                     | 잘못된 문법으로 요청을 보내고 있어 서버가 이해할 수 없음                                               |
| 401  | Unauthorized                    | 요청을 위해 권한 인증이 필요함 (ex. 토큰이 없음)                                                       |
| 402  | Payment Required                | 결제 시스템을 위해 만들어졌으나 현재는 사용하지 않음                                                   |
| 403  | Forbidden                       | 클라이언트가 요청한 컨텐츠에 대해 접근할 권리가 없음 (신원 인증은 되었지만 권한은 없음)                |
| 404  | Not Found                       | 요청한 URI를 찾을 수 없음                                                                              |
| 405  | Method Not Allowed              | 클라이언트가 보낸 메소드가 해당 URI에서 지원하지 않음                                                  |
| 406  | Not Acceptable                  | 클라이언트의 요청에 대해 응답할만한 컨텐츠가 없음                                                      |
| 407  | Proxy Authentication Required   | 401과 동일하나, proxy를 통해 인증해야 함                                                               |
| 408  | Request Timeout                 | 요청에 응답하는 시간이 오래 걸려 요청을 끊음 (보내지 않고 끊을 때도 있음)                              |
| 409  | Conflict                        | 클라이언트의 요청이 서버의 상태와 충돌이 발생할 수 있음                                                |
| 410  | Gone                            | 요청한 URI가 더 이상 사용되지 않고 사라졌음                                                            |
| 411  | Length Required                 | 요청 헤더에 Content-length가 포함되어야 함                                                             |
| 412  | Precondition Failed             | 요청 헤더의 조건이 서버의 조건에 적절하지 않음                                                         |
| 413  | Payload Too Large               | request payload가 서버에서 정의한 최대 크기보다 큼                                                     |
| 414  | URI Too Long                    | 요청된 URI가 너무 길어서 처리할 수 없음                                                                |
| 415  | Unsupported Media Type          | 서버가 지원하지 않는 미디어 포맷을 요청함                                                              |
| 416  | Requested Range Not Satisfiable | 요청 헤더에 있는 Range 필드가 잘못됨                                                                   |
| 417  | Expectation Failed              | 요청 헤더에 있는 Expect 필드가 적절하지 않음                                                           |
| 418  | I'm a teapot                    | 서버는 티팟이므로 커피 내리기를 거절했음                                                               |
| 421  | Misdirected Request             | 요청이 응답을 생성할 수 없는 서버로 지정됨                                                             |
| 422  | Unprocessable Entity            | 문법 오류로 인하여 처리할 수 없음?                                                                     |
| 423  | Locked                          | 요청한 리소스는 접근하는 것이 잠겨있음                                                                 |
| 424  | Failed Dependency               | 이전 요청이 실패했기 때문에 현재의 요청도 실패했음                                                     |
| 425  | Too Early                       | 서버가 재생될 수 있는 요청을 처리하는 것을 원치 않음                                                   |
| 426  | Upgrade Required                | 현재 요청한 프로토콜에 대한 처리는 거절함, 다른 프로토콜로 업그레이드를 하면 서버가 처리해줄 수도 있음 |
| 428  | Precondition Required           | 필수 전제 조건 헤더가 누락됨                                                                           |
| 429  | Too Many Requests               | 클라이언트가 한정된 시간에 너무 많은 요청을 보냄                                                       |
| 431  | Request Header Fields Too Large | 요청한 헤더 필드가 너무 커서 처리할 수 없음, 헤더 필드를 줄여서 다시 요청해야 함                       |
| 451  | Unavailable For Legal Reasons   | 클라이언트가 요청한 것은 정부에 의해 검열된 불법적인 리소스임                                          |

## 5. 5로 시작하는 경우 = Server Error  
> 정상적인 클라이언트의 요청에 대해 서버의 문제로 인해 응답할 수 없음  

| code | description                     | 설 명                                                                                           |
| :--: | :--- | :--- |
| 500 | Internal Server Error           | 서버의 문제로 응답할 수 없음                                                                                  |
| 501 | Not Implemented                 | 서버가 지원하지 않는 새로운 메소드를 사용하여 요청함 클라이언트 요청에 대해 서버가 수행할 수 있는 기능이 없음 |
| 502 | Bad Gateway                     | 서버 위의 서버에서 오류가 발생, proxy나 gateway 등에서 응답함                                                 |
| 503 | Service Unavailable             | 현재 서버가 일시적으로 사용이 불가함 일반적으로 유지보수로 인해 중단되거나 과부하가 걸린 서버임               |
| 504 | Gateway Timeout                 | 서버가 다른 서버로 요청을 보냈으나 delay가 발생하여 처리가 불가능함                                           |
| 505 | HTTP Version Not Supported      | 서버가 지원하지 않거나 적절하지 않은 프로토콜로 요청을 함                                                     |
| 506 | Variant Also Negotiates         | 서버에 내부 구성 오류가 있음                                                                                  |
| 507 | Insufficient Storage            | 서버에 내부 구성 오류가 있음                                                                                  |
| 508 | Loop Detected                   | 요청을 처리하는 동안 무한 루프를 감지함                                                                       |
| 510 | Not Extended                    | 서버가 처리하기 위해서는 요청을 더 확장해야 함                                                                |
| 511 | Network Authentication Required | 클라이언트가 네트워크 액세스를 얻으려면 인증이 필요함                                                         |

