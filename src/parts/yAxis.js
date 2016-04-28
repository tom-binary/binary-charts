export default ({ pipSize }) => ({
    lineWidth: 1,
    opposite: true,
    labels: {
        align: 'left',
        formatter() { return this.value.toFixed(pipSize); },
    },
    title: { text: null },
    floor: 0,
    offset: 10,
});
