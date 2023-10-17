import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import { currency_code } from '@/app/lib/utils/utils';

function valueText(value) {
  return `${value} `+currency_code;
}

export default function RangeSlider({defaultValue=[0,100],min=0,max=100,onChangeCommited}) {

  return (
    <Box>
      <Slider
        track={false}
        onChangeCommitted={onChangeCommited}
        value={defaultValue}
        getAriaLabel={() => 'Amount'}
        getAriaValueText={valueText}
        marks={[
          {
            value: 0,
            label: `${currency_code}+${min}`,
          },
          {
            value: 100,
            label:  `${currency_code}+${max}`,
          },
        ]}
     
        sx={{
          // Need both of the selectors to make it works on the server-side and client-side
          [`& [style*="left:0%"], & [style*="left: 0%"]`]: {
            [`&.${sliderClasses.markLabel}`]: {
              transform: 'none',
            },
            [`& .${sliderClasses.valueLabel}`]: {
              left: 'calc(var(--Slider-thumbSize) / 2)',
              borderBottomLeftRadius: 0,
              '&::before': {
                left: 0,
                transform: 'translateY(100%)',
                borderLeftColor: 'currentColor',
              },
            },
          },
          [`& [style*="left:100%"], & [style*="left: 100%"]`]: {
            [`&.${sliderClasses.markLabel}`]: {
              transform: 'translateX(-100%)',
            },
            [`& .${sliderClasses.valueLabel}`]: {
              right: 'calc(var(--Slider-thumbSize) / 2)',
              borderBottomRightRadius: 0,
              '&::before': {
                left: 'initial',
                right: 0,
                transform: 'translateY(100%)',
                borderRightColor: 'currentColor',
              },
            },
          },
        }}
      />
    </Box>
  );
}