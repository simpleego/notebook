# !/usr/bin/python3  
from tkinter import *  
  
top = Tk()  
top.geometry("300x200")  
  
labelframe1 = LabelFrame(top, text="Positive Comments")  
labelframe1.pack(fill="x", expand="yes")  
  
toplabel = Label(labelframe1, text="Place to put the positive comments")  
toplabel.pack()  
  
labelframe2 = LabelFrame(top, text = "Negative Comments")  
labelframe2.pack(fill="both", expand = "yes")  
  
bottomlabel = Label(labelframe2,text = "Place to put the negative comments")  
bottomlabel.pack()  
  
top.mainloop()  