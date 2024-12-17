# Polymorphisim,abstract class/methods, overriding 
- Remote is super class of all these 3 class Tv, Home Theater, Cd Player.
- Basic functions like on , off , volume +-, channel +- etc are in super class these are overridden
- Methods those are not common are implemented in interfaces like Eject , Insert , for Cd player , Display settings for TV and Theater etc
```java
interface Remotable {
    void turnOff();
    void turnOn();
    void volumeUp();
    void volumeDown();
}
```

> Then we make all devices implement this interface.

```java
class Television implements Remotable {

    @Override
    void turnOff() {
        System.out.println("Television is turned off");
    }

    //implements the rest.
}

class HomeTheater implements Remotable {
    // implements likes Television
}

class CDPlayer implements Remotable {
}  
```

> Then made a Remote class to handle Remotable devices.

```java
class Remote  {
    private Remotable target;

    public Remote(Remotable target) {
        this.target = target;
    }

    public void turnOn() {
        target.turnOn();
    }
}  
```

> And assemble everything, we have something like this:


```java
Television tv = new Television();
Remote remote = new Remote(tv);
remote.turnOn(); 
```
