import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

type Props = {
  title: string;
  bgColor?: string;
  titleColor?: string;
  onPress: (e: GestureResponderEvent) => void;
};

export const Button: VFC<Props> = ({
  title,
  bgColor = 'bg-gray-500',
  titleColor = 'text-white',
  onPress,
}) => (
  <TouchableOpacity
    style={tw(`mb-4 mx-3 rounded-3xl w-11/12 ${bgColor}`)}
    onPress={onPress}
  >
    <Text style={tw(`text-center text-lg font-semibold p-2 ${titleColor}`)}>
      {title}
    </Text>
  </TouchableOpacity>
);
