import React, { forwardRef, LegacyRef,  useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { MaterialIcons, FontAwesome, Octicons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { styles } from "./styles";

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRigth?: IconComponent;
  iconLeftName?: string;
  iconRightName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRigthPress?: () => void;
  height?: number;
  labelStyle?: StyleProp<TextStyle>;
  keyboardType?: string;
  placeholder?: string;
};

export const InputModal = forwardRef(
  (props: Props, ref: LegacyRef<TextInput> | null) => {
    const {
      IconLeft,
      IconRigth,
      iconLeftName,
      iconRightName,
      title,
      onIconLeftPress,
      onIconRigthPress,
      height,
      labelStyle,
      ...rest
    } = props;

    const calculateSizeWidth = () => {
      if (IconLeft && IconRigth) {
        return "80%";
      } else if (IconLeft || IconRigth) {
        return "90%";
      } else {
        return "100%";
      }
    };

    const calculateSizePaddingLeft = () => {
      if (IconLeft && IconRigth) {
        return 0;
      } else if (IconLeft || IconRigth) {
        return 10;
      } else {
        return 20;
      }
    };

    return (
      <>
        {title && <Text style={[styles.titleInput, labelStyle]}>{title}</Text>}
        <View
          style={[
            styles.boxInput,
            {
              paddingLeft: calculateSizePaddingLeft(),
              height: height ? height : 40,
            },
          ]}
        >
          {IconLeft && iconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress} style={styles.button}>
              <IconLeft
                name={iconLeftName as any}
                size={20}
                color={themas.colors.gray}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          {rest.keyboardType === "numeric" && (
            <TextInput
            style={[
              styles.input,
              { width: calculateSizeWidth(), height: "100%" },
            ]}
            ref={ref}
            multiline
            {...rest}
            keyboardType="numeric"
            placeholderTextColor={themas.colors.gray}
            placeholder={rest.placeholder}
          />
          )}
          {rest.keyboardType !== "numeric" && (
            <TextInput
            style={[
              styles.input,
              { width: calculateSizeWidth(), height: "100%" },
            ]}
            ref={ref}
            multiline
            {...rest}
            keyboardType={rest.keyboardType}
            placeholderTextColor={themas.colors.gray}
            placeholder={rest.placeholder}
          />
          )}
          
          {IconRigth && iconRightName && (
            <TouchableOpacity onPress={onIconRigthPress} style={styles.button}>
              <IconRigth
                name={iconRightName as any}
                size={20}
                color={themas.colors.gray}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
);
