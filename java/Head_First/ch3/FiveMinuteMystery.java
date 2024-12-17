package ch3;

public class FiveMinuteMystery {
  void solution1() {
    int x = 0;
    Contact[] contacts = new Contact[10];
    while (x < 10) {   // make 10 contact objects
      contacts[x] = new Contact();
      x = x + 1;
    }
    // do complicated Contact list updating with contacts
  }

  void solution2() {
    int x = 0;
    Contact contactRef;
    while ( x < 10 ) {   // make 10 contact objects
      contactRef = new Contact();
      x = x + 1;
    }
    // do complicated Contact list updating stuff with contactRef
  }

}

class Contact {
}
