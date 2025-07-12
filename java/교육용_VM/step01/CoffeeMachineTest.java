package coffeeMachine;

public class CoffeeMachineTest {
    public static void main(String[] args) {
        // 밀크커피 객체 생성 및 설정
        CoffeeMaterials coffeeMaterials = new CoffeeMaterials();
        coffeeMaterials.setMerterials(100,100,100,100,100);
        coffeeMaterials.printInfo();
    }
}
