# tkinter 패키지 import
import tkinter
from time import sleep

# Tk Class 선언으로 window 창 생성
window = tkinter.Tk()

# 생성할 window 창의 크기 및 초기 위치 설정 매서드: geometry()
window_width = 400
window_height = 200
window_pos_x = 700
window_pos_y = 100

window.geometry("{}x{}+{}+{}".format(window_width, window_height, window_pos_x, window_pos_y))

# 생성한 Window 창의 크기 조절 가능 여부 설정: resizable()
window.resizable(False, False)   # True, False 대신 1, 0을 사용할 수 있음

# 생성한 Window 창의 Title 설정: title()
window.title("Tkinter: Entry Test by Rosmary")

# 생성한 Window 창의 Icon 설정: iconphoto()
window.iconphoto(False, tkinter.PhotoImage(file="icon1.png"))

# Button command 동작 지정
def get_entry_value(): print(entry1.get())
def get_pw_value(): print(entry_password.get())
def remove_hello(): entry1.delete(0,5)

# tkinter.Entry 클래스 선언 및 Entry 위젯 생성
entry1 = tkinter.Entry(window)
button_get = tkinter.Button(window, text="Entry Get", command=get_entry_value)
button_delete = tkinter.Button(window, text="Remove Hello", command=remove_hello)

entry_password = tkinter.Entry(window, show="&")
button_get_pw = tkinter.Button(window, text="Password Get", command=get_pw_value)

entry1.insert(0, "Hello WoRd")
entry1.config(state="disabled")

# 생성한 Entry 위젯을 pack() 매서드로 배치
entry1.pack()
button_get.pack()
button_delete.pack()
entry_password.pack()
button_get_pw.pack()

# 생성한 창을 유지하기 위한 코드 작성
window.mainloop()