"use client";

export default function PulseBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">

            {/* Position */}
            <div className="absolute left-0 w-full top-[85%] -translate-y-1/2">

                {/* Moving ECG strip */}
                <div className="flex w-[200%] animate-pulseScroll">

                    <svg
                        viewBox="0 0 3000 200"
                        preserveAspectRatio="none"
                        className="w-full h-[120px]"
                    >
                        {/* Glow */}
                        <path
                            d="
    M0 100 
    L200 100 
    L240 100 L250 80 L260 40 L270 160 L280 100 
    L600 100 
    L640 100 L650 80 L660 40 L670 160 L680 100 
    L1000 100 
    L1040 100 L1050 80 L1060 40 L1070 160 L1080 100 
    L1400 100 
    L1440 100 L1450 80 L1460 40 L1470 160 L1480 100 
    L1800 100 
    L1840 100 L1850 80 L1860 40 L1870 160 L1880 100 
    L2200 100 
    L2240 100 L2250 80 L2260 40 L2270 160 L2280 100 
    L2600 100 
    L2640 100 L2650 80 L2660 40 L2670 160 L2680 100 
    L3000 100
  "
                            className="pulse-line"
                        />

                        {/* Line */}
                        <path
                            d="
    M0 100 
    L200 100 
    L240 100 L250 80 L260 40 L270 160 L280 100 
    L600 100 
    L640 100 L650 80 L660 40 L670 160 L680 100 
    L1000 100 
    L1040 100 L1050 80 L1060 40 L1070 160 L1080 100 
    L1400 100 
    L1440 100 L1450 80 L1460 40 L1470 160 L1480 100 
    L1800 100 
    L1840 100 L1850 80 L1860 40 L1870 160 L1880 100 
    L2200 100 
    L2240 100 L2250 80 L2260 40 L2270 160 L2280 100 
    L2600 100 
    L2640 100 L2650 80 L2660 40 L2670 160 L2680 100 
    L3000 100
  "
                            className="pulse-line"
                        />
                    </svg>

                </div>
            </div>
        </div>
    );
}