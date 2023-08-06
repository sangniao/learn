import {AbstractExampleTuiControl} from '../control';
import {AbstractExampleTuiHint} from '../hint';
import {AbstractExampleTuiInteractive} from '../interactive';

export type TuiSupportingDocumentationComponent =
    | AbstractExampleTuiInteractive
    | AbstractExampleTuiControl
    | AbstractExampleTuiHint;
