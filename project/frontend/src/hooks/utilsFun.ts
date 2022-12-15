export const handleKeypress: any = (e: any, fun: () => any) => {
    if (e.keyCode === 13) {
        fun();
    }
};