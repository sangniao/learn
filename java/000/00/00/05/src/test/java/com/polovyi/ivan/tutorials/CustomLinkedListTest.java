package com.polovyi.ivan.tutorials;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CustomLinkedListTest {

    @Test
    public void shouldCreateEmptyLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        int size = customArrayList.size();
        // then
        assertEquals(0, size);
    }

    @Test
    public void shouldAddOneElementToLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.addFront('A');
        // then
        assertEquals(1, customArrayList.size());
    }

    @Test
    public void shouldAddElementToLinkedListAsHeadWhenIsNoElements() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        char a = 'A';
        customArrayList.addFront(a);
        // then
        assertTrue(a == customArrayList.get(0));
        assertEquals(1, customArrayList.size());
    }

    @Test
    public void shouldAddElementToLinkedListAsHead() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.addFront('A');
        customArrayList.addFront('B');
        char c = 'C';
        customArrayList.addFront(c);
        // then
        assertTrue(c == customArrayList.get(0));
        assertEquals(3, customArrayList.size());
    }

    @Test
    public void shouldAddElementToLinkedListAsHeadCallingAddBackWhenIsNoElements() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        char a = 'A';
        customArrayList.addBack(a);
        // then
        assertTrue(a == customArrayList.get(0));
        assertEquals(1, customArrayList.size());
    }

    @Test
    public void shouldAddElementToLinkedListAsTailCallingAddBack() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        char c = 'C';
        customArrayList.addFront('B');
        customArrayList.addFront('A');
        // when
        customArrayList.addBack(c);
        // then
        assertTrue(c == customArrayList.get(2));
        assertEquals(3, customArrayList.size());
    }

    @Test
    public void shouldRemoveFirstElementFromLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        // when
        customArrayList.removeFirst();
        // then
        assertTrue('B' == customArrayList.get(0));
        assertEquals(2, customArrayList.size());
    }

    @Test
    public void shouldDoNothingWhenRemoveFirstFromLinkedListCalledOnEmptyList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.removeFirst();
        // then
        assertEquals(0, customArrayList.size());
    }

    @Test
    public void shouldRemoveFirstElementFromLinkedListWithOnlyOneElement() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addFront('A');
        // when
        customArrayList.removeFirst();
        // then
        assertEquals(0, customArrayList.size());
    }

    @Test
    public void shouldRemoveLastElementFromLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        // when
        customArrayList.removeLast();
        // then
        assertTrue('A' == customArrayList.get(0));
        assertTrue('B' == customArrayList.get(1));
        assertEquals(2, customArrayList.size());
    }

    @Test
    public void shouldDoNothingWhenRemoveLastFromLinkedListCalledOnEmptyList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.removeLast();
        // then
        assertEquals(0, customArrayList.size());
    }

    @Test
    public void shouldDoNothingWhenClearCalledOnEmptyLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.clear();
        // then
        assertEquals(0, customArrayList.size());
    }

    @Test
    public void shouldClearLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        // when
        customArrayList.clear();
        // then
        assertEquals(0, customArrayList.size());
    }

    @Test
    public void shouldGetFirstElementFromLinked() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addFront('B');
        Character firstElement = 'A';
        customArrayList.addFront(firstElement);
        // when
        Character first = customArrayList.getFirst();
        // then
        assertTrue(firstElement.equals(first));
    }

    @Test
    public void shouldGetLastElementFromLinked() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        Character lastElement = 'B';
        customArrayList.addFront(lastElement);
        customArrayList.addFront('A');
        // when
        Character last = customArrayList.getLast();
        // then
        assertTrue(lastElement.equals(last));
    }

    @Test
    public void shouldReturnNullWhenGetMethodCalledOnEmptyLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        Character character = customArrayList.get(0);
        // then
        assertNull(character);
    }

    @Test
    public void shouldReturnNullWhenGetMethodCalledWithIndexLargerThenLastOneLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        // when
        Character character = customArrayList.get(customArrayList.size());
        // then
        assertNull(character);
    }

    @Test
    public void shouldReturnTailWhenGetMethodCalledWithLastIndex() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        // when
        Character character = customArrayList.get(customArrayList.size() - 1);
        // then
        assertTrue(character.equals('C'));
    }

    @Test
    public void shouldReturnHeadWhenGetMethodCalledWithZeroIndex() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        // when
        Character character = customArrayList.get(0);
        // then
        assertTrue(character.equals('A'));
    }

    @Test
    public void shouldRemoveValueFromHeadOfLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        // when
        customArrayList.removeValue('A');
        // then
        assertTrue(customArrayList.get(0).equals('B'));
        assertEquals(1, customArrayList.size());
    }

    @Test
    public void shouldRemoveValueFromLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        customArrayList.addBack('A');
        customArrayList.addBack('B');
        customArrayList.addBack('C');
        customArrayList.addBack('D');
        customArrayList.addBack('E');
        customArrayList.addBack('F');
        // when
        customArrayList.removeValue('E');
        // then
        assertTrue(customArrayList.get(0).equals('A'));
        assertTrue(customArrayList.get(4).equals('F'));
        assertEquals(5, customArrayList.size());
    }

    @Test
    public void shouldDoNothingWhenRemoveValueCalledOnEmptyLinkedList() {
        // given
        CustomLinkedListImpl<Character> customArrayList = new CustomLinkedListImpl<>();
        // when
        customArrayList.removeValue('A');
        // then
        assertEquals(0, customArrayList.size());
    }
}
