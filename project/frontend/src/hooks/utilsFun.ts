export const handleKeypress: any = (e: any, fun: () => any) => {
    if (e.keyCode === 13) {
        fun();
    }
};

export const numToStringConvertor = (value: string | number) => {
    switch (value) {
        case 1:
            value = 'A';
            break
        case 11:
            value = 'J';
            break
        case 12:
            value = 'Q';
            break
        case 13:
            value = 'k';
            break

    }
    return value;
}