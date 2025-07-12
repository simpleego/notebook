package coffeeMachine;

public class CoffeeMaterials {
    private int milkAmount;    // 우유 양 (ml)
    private int sugarAmount;   // 설탕 양 (g)
    private int coffeeAmount;  // 커피 원두 양 (g)
    private int cupAmount;  // 컵의 수 (개)
    private  int waterAmount; // 물의 양(ml)

    public void setMerterials(int milkAmount, int sugarAmount, int coffeeAmount, int cupAmount, int waterAmount) {
        this.milkAmount = milkAmount;
        this.sugarAmount = sugarAmount;
        this.coffeeAmount = coffeeAmount;
        this.cupAmount = cupAmount;
        this.waterAmount = waterAmount;
    }


    public int getCupAmount() {
        return cupAmount;
    }

    public void setCupAmount(int cupAmount) {
        this.cupAmount = cupAmount;
    }

    public int getWaterAmount() {
        return waterAmount;
    }

    public void setWaterAmount(int waterAmount) {
        this.waterAmount = waterAmount;
    }

    public void setMilkAmount(int milkAmount) {
        this.milkAmount = milkAmount;
    }

    public void setSugarAmount(int sugarAmount) {
        this.sugarAmount = sugarAmount;
    }

    public void setCoffeeAmount(int coffeeAmount) {
        this.coffeeAmount = coffeeAmount;
    }

    public int getMilkAmount() {
        return milkAmount;
    }

    public int getSugarAmount() {
        return sugarAmount;
    }

    public int getCoffeeAmount() {
        return coffeeAmount;
    }

    // 커피 정보 출력 메서드
    public void printInfo() {
        System.out.println("--------------------------");
        System.out.println("우유: " + milkAmount + "ml");
        System.out.println("설탕: " + sugarAmount + "g");
        System.out.println("커피 원두: " + coffeeAmount + "g");
        System.out.println("물: " + waterAmount + "ml");
        System.out.println("컵: " + cupAmount + "개");
        System.out.println("---------------------------");
    }
}
