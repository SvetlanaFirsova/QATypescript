type PackageSize = 'large' | 'small';
type Workload = 'very high' | 'high' | 'increased' | 'normal';

class DeliveryCost {
    private distanceToTheDestinations: number;
    private packageSize: PackageSize;
    private fragility: boolean;
    private workloadCoefficient: Workload;
    private calculatedCost: number;

    constructor(
        distanceToTheDestinations: number, 
        packageSize: PackageSize, 
        fragility: boolean, 
        workloadCoefficient: Workload
    ) {
        this.distanceToTheDestinations = distanceToTheDestinations;
        this.packageSize = packageSize;
        this.fragility = fragility;
        this. workloadCoefficient =  workloadCoefficient;
        this.calculatedCost = 0;
    }

    private calculateCost(): number {
        //Distance validation
        if (this.distanceToTheDestinations <= 0) {
        throw new Error('Distance must be greater than 0');
    }

        let cost = 0;
        
        //Calculate the distanse
        if (this.distanceToTheDestinations > 30){
            cost += 300;
        } else if (this.distanceToTheDestinations > 10){
            cost += 200;
        } else if (this.distanceToTheDestinations > 2){
            cost += 100;
        } else {
            cost += 50;
        }

        //Calculate the size
        //cost += this.packageSize === 'large' ? 200 : 100;
        if (this.packageSize === 'large') {
            cost += 200;
        } else if (this.packageSize === 'small') {
            cost += 100;
        } else {
            throw new Error(`Unsupported package size: ${this.packageSize}`);
        }

        //Calculate the fragility

        if (this.fragility && this.distanceToTheDestinations > 30) {
            throw new Error("Fragile packages cannot be delivered over 30 km");
        }
        if (this.fragility) {
            cost += 300;
        }

        //Calculate the workload
        let coefficient = 1;

        switch (this.workloadCoefficient) {
            case 'very high':
                coefficient = 1.6;
                break;
            case 'high':
                coefficient = 1.4;
                break;
            case 'increased':
                coefficient = 1.2;
                break;
            case 'normal':
                coefficient = 1;
                break;
        }

        cost *= coefficient;

        //Calculate the final cost based on the minimum unit price
        return cost < 400 ? 400 : cost
    }

    finalDeliveryCost() {
        this.calculatedCost = this.calculateCost();

        console.log(`Distance to the destinations is: ${this.distanceToTheDestinations}`);
        console.log(`Package size is: ${this.packageSize}`);
        console.log(`Fragility is: ${this.fragility}`);
        console.log(`Coefficient of very hard workload is: ${this.workloadCoefficient}`);
        console.log(`Amount of the delivery cost will be = ${this.calculatedCost}$`);
    }
}

const myDeliveryCost = new DeliveryCost(30, 'large', true, 'very high');
myDeliveryCost.finalDeliveryCost();