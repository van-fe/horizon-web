import { onBeforeUnmount, onMounted, watchEffect, type ComputedRef, type Ref } from 'vue'

export const useDrag = (
    itemDomRef: Ref<HTMLElement | null>,
    targetRef: Ref<HTMLElement | null>,
    draggable: ComputedRef<boolean>,
) => {
    onMounted(() => {
        watchEffect(() => {
            if (draggable.value) {
                onDraggable()
            } else {
                offDraggable()
            }
        })
    })

    onBeforeUnmount(() => {
        offDraggable()
    })

    const onMousedown = (e: MouseEvent) => {
        const downX = e.clientX;
        const downY = e.clientY;

        const initOffsetX = itemDomRef.value
            ? itemDomRef.value.style.transform.includes('%')
                ? 0 - itemDomRef.value.offsetWidth / 2
                : parseInt(itemDomRef.value.style.transform.split('(')[1].split('px')[0])
            : 0;
        const initOffsetY = itemDomRef.value
            ? itemDomRef.value.style.transform.includes('%')
                ? 0 - itemDomRef.value.offsetHeight / 2
                : parseInt(itemDomRef.value.style.transform.split(', ')[1].split('px')[0])
            : 0;

        const offsetX = initOffsetX;
        const offsetY = initOffsetY;

        const targetRect = targetRef.value!.getBoundingClientRect();
        const targetLeft = targetRect.left;
        const targetTop = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;

        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        const minLeft = -targetLeft + offsetX;
        const minTop = -targetTop + offsetY;
        const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
        const maxTop = clientHeight - targetTop - targetHeight + offsetY;

        const onMousemove = (e: MouseEvent) => {
            let moveX = offsetX + e.clientX - downX;
            let moveY = offsetY + e.clientY - downY;

            moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
            moveY = Math.min(Math.max(moveY, minTop), maxTop);

            if (itemDomRef.value) {
                itemDomRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };

        const onMouseup = () => {
            document.body.style.cursor = 'default';
            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('mouseup', onMouseup);
        };

        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
    };

    const onDraggable = () => {
        if (itemDomRef.value && targetRef.value) {
            targetRef.value.addEventListener('mousedown', onMousedown);
            targetRef.value.addEventListener('mouseenter', () => {
                console.log('mouseenter11111');
                document.body.style.cursor = 'move';
            });
            targetRef.value.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            });
        }
    };
    const offDraggable = () => {
        if (itemDomRef.value && targetRef.value) {
            targetRef.value.removeEventListener('mousedown', onMousedown);
            targetRef.value.removeEventListener('mouseenter', () => {
                document.body.style.cursor = 'move';
            });
            targetRef.value.removeEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            });
        }
    };

}