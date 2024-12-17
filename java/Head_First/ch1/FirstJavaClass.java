package ch1;

import java.io.FileNotFoundException;

public class FirstJavaClass {
  private static int x;

  public static void main(String[] args) {
    int size = 27;
    String name = "Fido";
    Dog myDog = new Dog(name, size);
    x = size - 5;
    if (x < 15) myDog.bark(8);

    while (x > 3) {
      myDog.play();
    }

    int[] numList = {2, 4, 6, 8};
    System.out.print("Hello");
    System.out.print("Dog: " + name);
    String num = "8";
    int z = Integer.parseInt(num);

    try {
      readTheFile("myFile.txt");
    }
    catch (FileNotFoundException ex) {
      System.out.print("File not found.");
    }

  }

  private static void readTheFile(String s) throws FileNotFoundException {

  }

}

class Dog {
  private final String name;
  private final int size;

  public Dog(String name, int size) {
    this.name = name;
    this.size = size;
  }

  public void bark(int i) {

  }

  public void play() {

  }
}
