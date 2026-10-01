import { SlideProblem } from './slides/SlideProblem';
import { SlideSolution } from './slides/SlideSolution';
import { SlideDoorway } from './slides/SlideDoorway';
import { Connect } from './steps/Connect';
import { Scan } from './steps/Scan';
import { Dashboard } from './steps/Dashboard';
import { Rogers } from './steps/Rogers';
import { Notion } from './steps/Notion';
import { Flight } from './steps/Flight';
import { RapidFire } from './steps/RapidFire';
import { Library } from './steps/Library';
import { Wrapped } from './wrapped/Wrapped';
import type { ComponentType } from 'react';
export const registry:Record<string,ComponentType<{showCursor?:boolean}>> = {
 'slide-problem':SlideProblem,'slide-solution':SlideSolution,'slide-doorway':SlideDoorway,
 'step-connect':Connect,'step-scan':Scan,'step-dashboard':Dashboard,'step-rogers':Rogers,
 'step-notion':Notion,'step-flight':Flight,'step-rapidfire':RapidFire,'step-library':Library,wrapped:Wrapped,
};
