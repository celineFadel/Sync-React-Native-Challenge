import React, { useRef } from "react";
import { Animated, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

const images = [
    "http://138.197.24.211/DGA/web/media/cache/locations_main/uploads/images/9a4519fd5394a937f92968885f73b917.jpeg",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
];

export default function Carousel(props) {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContainer}>
                <Animated.ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: scrollX, 
                                    },
                                },
                            },
                        ],
                        { 
                            useNativeDriver: false 
                        }
                    )}
                    scrollEventThrottle={1}
                >
                    {props.images.map((image, imageIndex) => {
                        return (
                            <Animated.View
                                style={{ width: windowWidth, height: 250 }}
                                key={imageIndex}
                            >
                                <ImageBackground source={{ uri: image }} style={styles.card} />
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>

                <View style={styles.indicatorContainer}>
                    {images.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1),
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: "clamp",
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        flex: 1,
        marginTop: 4,
        marginHorizontal: 16,
        marginBottom: 0,
        borderRadius: 25,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
