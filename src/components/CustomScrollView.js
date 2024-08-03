import React from 'react'
import { ScrollView } from 'react-native'

export const CustomScrollView = ({ children, style, onScroll, horizontal,contentContainerStyle }) => {
    return (
        <ScrollView
            onScroll={onScroll}
            style={style}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={contentContainerStyle}
        >
            {children}
        </ScrollView>
    )
}