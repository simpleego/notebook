package ch1;

public class DooBee {
  public static void main(String[] args) {
    int x = 1;
    while (x < 3) {
      System.out.print("Doo");
      System.out.print("Bee");
      x = x + 1;
    }
    if (x == 3) {
      System.out.print("Do");
    }
  }
}

//% java DooBee
//DooBeeDooBeeDo


//  public static void main (String[] args) {
//    int x = 1;
//    while (x < _____ ) {
//      System.out._________("Doo");
//      System.out._________("Bee");
//      x = x + 1;
//    }
//    if (x == ______  ) {
//      System.out.print("Do");
//    }
//  }
