type PackageSize2 = 'large' | 'small';
type Workload2 = 'very high' | 'high' | 'increased' | 'normal';
type DeliveryOption = 'insurance' | 'express' | 'weekend';
type DeliverySlot = [number, number]; // Tuple: [startHour, endHour]

const SIZE_PRICES: Record<PackageSize2, number> = {
    large: 200,
    small: 100
};

//Closure - count for orders
const createDeliveryTracker = () => {
    let count = 0;
    return () => {
        count++;
        return count;
    };
};

const trackDelivery = createDeliveryTracker();

//getDistanceCost
const getDistanceCost = (distanceToTheDestinations: number): number => {
    if (distanceToTheDestinations > 30) return 300;
    if (distanceToTheDestinations > 10) return 200;
    if (distanceToTheDestinations > 2) return 100;
    return 50;
};

//getWorkload
const getWorkloadCoefficient = (workload2: Workload2): number => {
    const coefficients: Record<Workload2, number> = {
        'very high': 1.6,
        'high': 1.4,
        'increased': 1.2,
        'normal': 1
    };
    return coefficients[workload2];
};


class DeliveryCost2 {
    private readonly MIN_COST = 400;

    private distanceToTheDestinations: number;
    private packageSize2: PackageSize2;
    private fragility: boolean;
    private workloadCoefficient2: Workload2;
    private options: DeliveryOption[];
    private deliverySlot?: DeliverySlot;

    constructor(
        distanceToTheDestinations: number,
        packageSize2: PackageSize2,
        fragility: boolean,
        workloadCoefficient2: Workload2,
        options: DeliveryOption[] = [], //Array of options
        deliverySlot?: DeliverySlot // Optional Tuple
    ) {
        // 2. Присвоюємо значення
        this.distanceToTheDestinations = distanceToTheDestinations;
        this.packageSize2 = packageSize2;
        this.fragility = fragility;
        this.workloadCoefficient2 = workloadCoefficient2;
        this.options = options;
        this.deliverySlot = deliverySlot;

        this.validateInput();
    }

    private validateInput() {
        if (this.distanceToTheDestinations <= 0) throw new Error('Distance must be > 0');
        if (this.fragility && this.distanceToTheDestinations > 30) {
            throw new Error("Fragile packages cannot be delivered over 30 km");
        }
        if (this.deliverySlot) {
            const [start, end] = this.deliverySlot;
            // Delivery starting from 22 to 8 am not allowed
            if (start >= 22 || start < 8) {
                throw new Error("Delivery starting from 22 to 8 am not allowed");
            }
        }
    }

private calculateBaseCost(): number {
    //Get cost based on distance
    const distanceCost = getDistanceCost(this.distanceToTheDestinations);

    //Get cost based on package size (using our lookup table)
    const sizeCost = SIZE_PRICES[this.packageSize2] || 0;

    //Calculate fragility surcharge
    const fragilitySurcharge = this.fragility ? 300 : 0;

    //Calculate subtotal before applying workload coefficient
    const subTotal = distanceCost + sizeCost + fragilitySurcharge;

    // Множимо на коефіцієнт навантаження
    return subTotal * getWorkloadCoefficient(this.workloadCoefficient2);
}

    
private calculateExtraCharges(): number {
        let extra = 0;

        // 1. Додаткові опції (Array)
        this.options.forEach(option => {
            if (option === 'insurance') extra += 150;
            if (option === 'express') extra += 200;
            if (option === 'weekend') extra += 100;
        });

        //Time slot (Tuple)
        if (this.deliverySlot) {
            const [start, end] = this.deliverySlot
            if (start >= 18 && end <= 22) {
                extra += 120;
            }
        }

        return extra;
    }

    public getFinalCost(): number {
        const total = this.calculateBaseCost() + this.calculateExtraCharges();
        const finalAmount = Math.max(total, this.MIN_COST);
        
        //Raise a counter through closure
        const orderNumber = trackDelivery();
        
        console.log(`--- Order #${orderNumber} ---`);
        console.log(`Distance: ${this.distanceToTheDestinations}km, Size: ${this.packageSize2}, Fragility: ${this.fragility}, Options: ${this.options.join(', ') || 'none'}`);
        console.log(`Total Cost: ${finalAmount}$`);
        
        return finalAmount;
    }
}

//Test Cases:

try {
    //Standard delivery
    const order1 = new DeliveryCost2(15, 'small', false, 'normal');
    order1.getFinalCost(); 

    //fragility + Express + Insurance
    const order2 = new DeliveryCost2(5, 'large', true, 'high', ['express', 'insurance']);
    order2.getFinalCost();

    //Nightly delivery (Slot)
    const order3 = new DeliveryCost2(25, 'small', false, 'increased', ['weekend'], [18, 22]);
    order3.getFinalCost();

    //Error: Nightly delivery after 22pm
    const order4 = new DeliveryCost2(10, 'small', false, 'normal', [], [23, 1]);
    order4.getFinalCost();

} catch (e) {
    console.error(`Error: ${(e as Error).message}`);
}