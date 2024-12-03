import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { Menu } from "../../models/Menu";
import Card from "../../components/Card";
import { FaPlus, FaMinus } from "react-icons/fa";
import { menuService } from "../../services/MenuSevice";
import { handleApiErrors } from "../../utils/Helpers";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import "/src/styles/Toast.scss";


function MenuPage() {
    const { currentUser, reloadUser } = useAuth();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [menuOpen, setMenuOpen] = useState({ info: false, highlights: false });
    const [animation, setAnimation] = useState({ info: false, highlights: false });
    const [isLoading, setIsLoading] = useState(false);
    const proteinExamples = "A whole egg (70g) / 2 slices of yellow cheese (50g) / half a cup of cottage cheese 3% (125g) / quarter cup of Bulgarian cheese or feta or salted cheese 5% (70g) / half a container of tuna in water (120g) / a container of yogurt pro 20 0% / tofu (80g) / white cheese 5% (100g) / low fat low sodium turkey pastrami (100g) / low fat low sodium beef shoulder pastrami (100g) / Tzfatit cheese (80g) / chicken breast, beef shoulder or beef fillet (60 g) / half a pullet (50 g) / chicken leg (70g) / half a chicken thigh (70 g) / half a portion of salmon (50 g) / tilapia or bass fillet (120g).";
    const carbsExamples = "3 tablespoons of rice (80g) / a cup of whole wheat pasta (70g) / 4 tablespoons of bulgur or quinoa (120g) / cooked sweet potato or baked potato (110g) / 3 tablespoons of couscous (90g) / 3 tablespoons of ptitim (60 g) / 4 tablespoons of beans or peas (120g) / 3 rice cakes or crispbreads / 3 rice sheets / a tablespoon of granola or branflakes (20g) / 2 slices of whole wheat bread (60g) / 3 slices of light bread (70g) / light bun (50g) / half a bun from whole wheat (25g) / half a large pita / a small light pita (50 g).";
    const fatsExamples = "Avocado (600g) / Raw tahini (15g) / Nuts (20g) / Natural peanut butter (15g) "

    useEffect(() => {
        setMenu(currentUser.menu);
    }, [currentUser.menu])

    const handleOpenMenu = (name: string) => {
        switch (name) {
            case "info":
                if (menuOpen.info && animation.info) {
                    setAnimation({ ...animation, info: false });
                    setTimeout(() => { setMenuOpen({ ...menuOpen, info: false }) }, 300);
                } else {
                    setMenuOpen({ ...menuOpen, info: true });
                    setTimeout(() => { setAnimation({ ...animation, info: true }) }, 100);
                }
                break;
            case "highlight":
                if (menuOpen.highlights && animation.highlights) {
                    setAnimation({ ...animation, highlights: false });
                    setTimeout(() => { setMenuOpen({ ...menuOpen, highlights: false }) }, 300);
                } else {
                    setMenuOpen({ ...menuOpen, highlights: true });
                    setTimeout(() => { setAnimation({ ...animation, highlights: true }) }, 100)
                }
                break;
            default:
                setMenuOpen({ info: false, highlights: false });
                setAnimation({ info: false, highlights: false });
                break;
        }
    };

    const onMealCompleted = (mealId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const isChecked = e.target.checked;
        menuService.updateMeal(mealId, { isCompleted: isChecked })
            .then((response) => {
                const updatedMeals = menu.meals.map(meal => {
                    if (meal.id === mealId) {
                        return response.data;
                    }
                    return meal;
                });
                setMenu({ ...menu, meals: updatedMeals });
                reloadUser({ ...currentUser, menu: { ...menu, meals: updatedMeals } });
                if (isChecked) {
                    toast.success("You finished the meal, good job!");
                }
                if (updatedMeals.every(meal => meal.isCompleted === true)) {
                    toast.success("You finished all the meals for the day, keep up!");
                }
            }).catch((error) => {
                const errorMsg = handleApiErrors(error);
                toast.error(errorMsg);
            }).finally(() => {
                setIsLoading(false);
            })
    }

    return (
        menu
            ? <main className="w-full flex justify-center">
                <div className="outer-card w-2/3">
                    {menu.meals.map(meal =>
                        <Card key={meal.id} customClass={`m-5 border ${meal.isCompleted && 'bg-green-500'}`}>
                            <h2 className="text-xl font-semibold">
                                <input id={`${meal.id}`}
                                    type="checkbox"
                                    checked={meal.isCompleted}
                                    onChange={(e) => onMealCompleted(meal.id, e)}
                                    className="plan-checkbox" />
                                <label htmlFor={`${meal.id}`}> {meal.name}</label>
                            </h2>
                            <div className="flex flex-col md:flex-row justify-around mt-3">
                                <span>Protein Points: {meal.proteinPoints}</span>
                                <span>Carbs Points: {meal.carbsPoints}</span>
                                <span>Fats Points: {meal.fatsPoints}</span>
                            </div>
                        </Card>)}
                    <Card customClass="m-5 border">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl font-semibold dark:text-customGold">Information</h2>
                            <button onClick={() => handleOpenMenu("info")}>{menuOpen.info ? <FaMinus /> : <FaPlus />}</button>
                        </div>
                        {menuOpen.info &&
                            <div className={`mt-3 meal-form ${animation.info ? "open" : ""}`}>
                                <span className="text-xl font-medium">1 point = 100 grams of a macronutrient</span>
                                <h3 className="text-lg font-medium dark:text-customGold">Protein point examples:</h3>
                                <p className="mb-2">{proteinExamples}</p>
                                <h3 className="text-lg font-medium dark:text-customGold">Carbs point examples:</h3>
                                <p className="mb-2">{carbsExamples}</p>
                                <h3 className="text-lg font-medium dark:text-customGold">Fats point examples:</h3>
                                <p className="mb-2">{fatsExamples}</p>
                            </div>}

                    </Card>
                    <Card customClass="m-5 border">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl font-semibold dark:text-customGold">Highlights</h2>
                            <button onClick={() => handleOpenMenu("highlight")}>{menuOpen.highlights ? <FaMinus /> : <FaPlus />}</button>
                        </div>
                        {menuOpen.highlights &&
                            <div className={`mt-3 meal-form ${animation.highlights ? "open" : ""}`}>
                                <ol className="list-decimal ms-5">
                                    <li>You can change the order of meals</li>
                                    <li>You can switch points between meals</li>
                                    <li>4 hours max between meals</li>
                                    <li>1 liter of water a day for  every 25 kg of body weight</li>
                                    <li>Vegetables as much as you want - greens and whites especially</li>
                                    <li>Free meal with approval after weighing</li>
                                    <li>Make sure you get 6-8 hours of sleep</li>
                                    <li>The results will improve with the accuracy!</li>
                                </ol>
                            </div>}
                    </Card>
                </div>

                {isLoading &&
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Loader />
                    </div>}

                <ToastContainer />
            </main>
            :
            <span>There is currently no menu assign to you</span>
    )
};

export default MenuPage