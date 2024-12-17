package ch4;

public class Puzzle4 {
  public static void main(String[] args) {
    Value[] values = new Value[6];
    int number = 1;
    int i = 0;
    while (i < 6) {
      values[i] = new Value();
      values[i].intValue = number;
      number = number * 10;
      i = i + 1;
    }

    int result = 0;
    i = 6;
    while (i > 0) {
      i = i - 1;
      result = result + values[i].doStuff(i);
    }
    System.out.println("result " + result);
  }
}

class Value {
  int intValue;

  public int doStuff(int factor) {
    if (intValue > 100) {
      return intValue * factor;
    } else {
      return intValue * (5 - factor);
    }
  }
}


//public class Puzzle4 {
//  public static void main(String [] args) {
//    ___________________________________
//    int number = 1;
//    int i = 0;
//    while (i < 6) {
//      ___________________________
//      ___________________________
//      number = number * 10;
//      _________________
//    }
//
//    int result = 0;
//    i = 6;
//    while (i > 0) {
//      _________________
//      result = result + ___________________
//    }
//    System.out.println("result " + result);
//  }
//}
//
//class ___________ {
//  int intValue;
//  ________  ______ doStuff(int _________) {
//    if (intValue > 100) {
//      return _________________________
//    } else {
//      return _________________________
//    }
//  }
//}

